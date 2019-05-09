'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    const Promise = require('bluebird');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = [
        'https://rsshub.avosapps.us/custom/http%3A%2F%2Ffeeds.initium.news%2Ftheinitium?filter=%E6%97%A9%E5%A0%B1|%E6%99%9A%E5%A0%B1&limit=2',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const feed = await parser.parseURL(url);

            return feed.items.map(item => {
                return {
                    title: item.title,
                    url: item.link,
                    summary: '',
                };
            });
        } catch (err) {
            console.error(err);
            console.error(url);
            return [];
        }
    });

    return flatten(data);
};