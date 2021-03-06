'use strict';

module.exports = (req, res) => {
    const http = require('./utils/http');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');
    const { p = 1 } = req.query;

    http.post({
        uri: `https://www.scientificamerican.com/behavior-and-society/?page=${p}`,
        headers: {
            'User-Agent': params.ua.mobile,
        },
        form: {
            source: 'article',
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = [];

            $('article').each(function() {
                const $elem = $(this);
                const $link = $elem.find('.t_listing-title > a');

                const title = $link.text();
                const url = $link.attr('href').replace('https://www.scientificamerican.com/article', '');

                const article = {
                    title,
                    url,
                    img: $elem
                        .find('.listing-wide__thumb img')
                        .attr('src')
                        .replace(/\?.+$/g, ''),
                    summary: $elem.find('.t_meta').text(),
                };

                data.push(article);
            });

            res.json({
                success: true,
                data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'sciam 获取失败',
            });
        });
};
