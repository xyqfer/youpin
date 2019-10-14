'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    const parser = new Parser();

    try {
        const feed = await parser.parseURL('http://mebook.cc/feed');

        return feed.items.map((item) => ({
            title: item.title,
            url: item.link,
            summary: item['content:encoded'],
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};
