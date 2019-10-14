'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = ['https://rsshub.avosapps.us/ifanr2/latest'];
    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const feed = await parser.parseURL(url);

            return feed.items.map((item) => ({
                title: item.title,
                url: item.link,
                summary: item.content || item.description || '',
            }));
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data);
};
