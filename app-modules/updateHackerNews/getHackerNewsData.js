'use strict';

module.exports = async ({ offsets = [1] }) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-libs');

    const results = await Promise.mapSeries(offsets, async (offset) => {
        try {
            const htmlString = await rp.get({
                uri: `https://news.ycombinator.com/news?p=${offset}`,
                headers: {
                    'User-Agent': params.ua.pc,
                },
            });

            const $ = cheerio.load(htmlString);
            const newsList = [];

            $('.itemlist .athing').each(function() {
                const $elem = $(this);

                newsList.push({
                    title: $elem.find('.storylink').text(),
                    url: $elem.find('.storylink').attr('href'),
                    newsId: $elem.attr('id'),
                });
            });

            return newsList;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return uniqBy(flatten(results), 'newsId');
};
