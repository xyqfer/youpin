'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-libs');

    const urls = [
        'http://www.echojs.com/',
        'http://www.echojs.com/latest/0',
        'http://www.echojs.com/latest/1',
        'http://www.echojs.com/latest/2'
    ];

    const result = await Promise.mapSeries(urls, async (uri) => {
        try {
            const htmlString = await rp.get({
                uri,
                headers: {
                    'User-Agent': params.ua.pc
                }
            });

            const $ = cheerio.load(htmlString);
            const newsList = [];

            $('#newslist > article').each(function () {
                const $elem = $(this);

                newsList.push({
                    title: $elem.find('h2 a').text(),
                    url: $elem.find('h2 a').attr('href'),
                    newsId: $elem.attr('data-news-id')
                });
            });

            return newsList;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return uniqBy(flatten(result), 'newsId');
};
