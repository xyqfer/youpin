'use strict';

module.exports = (url) => {
    const http = require('../http');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    const parseContent = (htmlString) => {
        const $ = cheerio.load(htmlString);
        const data = {
            title: $('.article-header h1')
                .eq(0)
                .text(),
            content: [],
        };

        $('.article-dual-body-item').each(function() {
            const $p = $(this).find('.article-paragraph');
            const enText = $p.eq(0).text();
            const zhText = $p.eq(1).text();

            if (enText !== '' && zhText !== '') {
                data.content.push({
                    en: enText,
                    zh: zhText,
                });
            }
        });

        return data;
    };

    return http
        .get({
            uri: `https://cn.nytimes.com${url}dual/`,
            headers: {
                'User-Agent': params.ua.mobile,
            },
        })
        .then((htmlString) => parseContent(htmlString))
        .catch((err) => {
            console.log(err);
            return Promise.reject();
        });
};
