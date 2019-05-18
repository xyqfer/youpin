'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const Parser = require('rss-parser');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = [
        'https://rsshub.avosapps.us/36kr/search/article/%E7%A5%9E%E8%AF%91%E5%B1%80?limit=5',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const feed = await parser.parseURL(url);

            return feed.items.map(item => {
                return {
                    title: item.title || '',
                    url: item.link,
                    summary: item.content
                };
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data);
};