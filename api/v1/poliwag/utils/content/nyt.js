'use strict';

module.exports = (url) => {
    const http = require('../http');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    return http
        .get({
            uri: `https://www.nytimes.com${url}`,
            headers: {
                'User-Agent': params.ua.mobile,
            },
        })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = {
                title: $('h1')
                    .eq(0)
                    .text(),
                content: [],
            };

            $('.StoryBodyCompanionColumn p').each(function() {
                const text = $(this).text();

                if (text !== '') {
                    data.content.push({
                        en: $(this).text(),
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
