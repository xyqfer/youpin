'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const cheerio = require('cheerio');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const {
        params
    } = require('app-libs');

    const urls = [
        'https://rsshub.avosapps.us/sspai/matrix',
        'https://rsshub.avosapps.us/qdaily/specialcolumn/63',
        // 'https://rsshub.avosapps.us/reuters/investigates?limit=3',
        'https://rsshub.avosapps.us/tianfateng/tag/books',
        // 'https://www.gatesnotes.com/rss',
        'https://museelogue.fireside.fm/rss',
        // 'https://rsshub.app/youtube/channel/UCb_CkUzhPsHXdrpQl9Zg5aA',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const xmlString = await rp.get({
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

            $('item').each(function() {
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