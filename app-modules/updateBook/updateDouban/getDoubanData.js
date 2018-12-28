'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    const uniqBy = require('lodash/uniqBy');
    let parser = new Parser();

    const feed = await parser.parseURL('https://rsshub.avosapps.us/douban/book/latest');
    const bookList = feed.items.map((item) => {
        const url = item.link;
        const cover = '';
        const name = item.title;
        const desc = item.content;
        const pubInfo = '';

        return {
            url,
            cover,
            name,
            desc,
            pubInfo,
        };
    });

    return uniqBy(bookList, 'url');
};
