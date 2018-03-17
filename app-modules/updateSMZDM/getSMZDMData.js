'use strict';

module.exports = async ({
    offsets = [1]
}) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const {
        params
    } = require('app-libs');

    const results = await Promise.mapSeries(offsets, async (offset) => {
        try {
            const htmlString = await rp.get({
                uri: `https://news.m.smzdm.com//ajax_get_list_html//${offset}`,
                headers: {
                    'User-Agent': params.ua.mobile
                }
            });

            const $ = cheerio.load(htmlString);
            const newsList = [];

            $('body > li').each(function () {
                const $elem = $(this);

                newsList.push({
                    title: $elem.find('h2').text(),
                    url: `http:${$elem.find('.openApp').attr('href')}`,
                    cover: $elem.find('.image > img').attr('src'),
                    desc: $elem.find('p').text()
                });
            });

            return newsList;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return uniqBy(flatten(results), 'url');
};