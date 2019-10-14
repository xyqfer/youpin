'use strict';

module.exports = (req, res) => {
    const http = require('./utils/http');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    http.get({
        uri: 'https://www.economist.com/printedition/',
        headers: {
            'User-Agent': params.ua.pc,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = {
                cover: {
                    img: $('img.component-image__img').attr('src'),
                    time: $('.print-edition__main-title-header__date').text(),
                    topic: $('.print-edition__main-title-header__edition').text(),
                },
                list: [],
            };

            $('.print-edition__content ul.list > li.list__item').each(function() {
                const $elem = $(this);

                const group = {
                    title: $elem.find('.list__title').text(),
                    list: [],
                };

                $elem.find('.list__link').each(function() {
                    const $link = $(this);
                    let title = $link.find('.print-edition__link-title').text();

                    if (title === '') {
                        title = $link.find('.print-edition__link-title-sub').text();
                    }

                    group.list.push({
                        url: $link.attr('href'),
                        title,
                        flyTitle: $link.find('.print-edition__link-flytitle').text(),
                    });
                });

                data.list.push(group);
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
                msg: 'te-magazine 获取失败',
            });
        });
};
