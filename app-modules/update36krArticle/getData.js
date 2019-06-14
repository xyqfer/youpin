'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const Parser = require('rss-parser');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = [
        'https://rsshub.avosapps.us/custom/https%3A%2F%2Frsshubhub.herokuapp.com%2F36kr%2Fsearch%2Farticle%2F%25E7%25A5%259E%25E8%25AF%2591%25E5%25B1%2580?limit=5',
        'https://rsshub.avosapps.us/custom/https%3A%2F%2Frsshubhub.herokuapp.com%2F36kr%2Fsearch%2Farticle%2F%25E7%25A7%2591%25E6%258A%2580%25E7%25A5%259E%25E5%259B%259E%25E5%25A4%258D?limit=2',
        'https://rsshub.avosapps.us/custom/https%3A%2F%2Frsshubhub.herokuapp.com%2F36kr%2Fsearch%2Ftopic%2F%25E4%25B8%2580%25E5%2591%25A8%25E5%25AE%259D%25E8%2597%258F%25E6%2596%2587%25E7%25AB%25A0?limit=1',
        'https://rsshub.avosapps.us/github/repos2/awesome-archive',
        'https://rsshub.avosapps.us/zhihu/people/answers/cheng-xu-yuan-zai-ri-ben?limit=3',
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