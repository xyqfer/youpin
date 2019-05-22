'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const Parser = require('rss-parser');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = [
        'https://rsshub.avosapps.us/36kr/search/article/%E7%A5%9E%E8%AF%91%E5%B1%80?limit=5',
        'https://rsshub.avosapps.us/36kr/search/topic/%E4%B8%80%E5%91%A8%E5%AE%9D%E8%97%8F%E6%96%87%E7%AB%A0?limit=1',
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