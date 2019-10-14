'use strict';

module.exports = (req, res) => {
    const http = require('./utils/http');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    const { p = 1 } = req.query;

    http.get({
        uri: `http://m.i21st.cn/story/index_${p}.html`,
        headers: {
            'User-Agent': params.ua.mobile,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = [];

            $('.ui-li').each(function() {
                const $elem = $(this);
                const $link = $elem.find('.ui-li-heading');

                const title = $link.text();
                const url = $link.attr('href');

                const news = {
                    title,
                    url,
                    summary: $elem.find('.ui-li-desc').text(),
                };

                data.push(news);
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
                msg: `i21st ${p} 获取失败`,
            });
        });
};
