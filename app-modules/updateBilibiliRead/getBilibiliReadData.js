'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const {
        params,
        http,
    } = require('app-libs');

    const urls = [
        'https://rsshub.avosapps.us/bilibili/read/3',
        'https://rsshub.avosapps.us/bilibili/read/29',
        'https://rsshub.avosapps.us/bilibili/read/17?filterout=%E8%BD%A6',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const xmlString = await http.get({
                uri: url,
                headers: {
                    'User-Agent': params.ua.pc
                },
            });
            const $ = cheerio.load(xmlString, {
                normalizeWhitespace: true,
                xmlMode: true
            });
            const result = [];

            $('item').each(function () {
                const $item = $(this);

                result.push({
                    url: $item.find('link').text(),
                    title: $item.find('title').text() || '',
                    summary: $item.find('description').text()
                });
            });

            return result;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data);
};