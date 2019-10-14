'use strict';

module.exports = (url) => {
    const http = require('../http');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    return http
        .get({
            uri: url,
            headers: {
                'User-Agent': params.ua.pc,
            },
        })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = {
                title: $('title').text(),
                content: [],
            };

            $('p').each(function() {
                const text = $(this).text();

                if (text !== '') {
                    data.content.push({
                        en: text,
                    });
                }
            });

            return data;
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject();
        });
};
