'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    let parser = new Parser();

    const feed = await parser.parseURL('https://terminus2049.github.io/atom.xml');
    return feed.items.slice(0, 5).map((item) => {
        return {
            url: item.link,
            title: item.title,
            summary: ''
        };
    });
};