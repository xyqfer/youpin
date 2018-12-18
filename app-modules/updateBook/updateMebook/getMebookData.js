'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    let parser = new Parser();

    try {
        const feed = await parser.parseURL('http://mebook.cc/feed');

        return feed.items.map(item => {
            return {
                title: item.title,
                url: item.link,
                summary: item['content:encoded']
            };
        });
    } catch (err) {
        console.error(err);
        return [];
    }
};