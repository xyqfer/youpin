'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    const Promise = require('bluebird');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = [
        'https://terminus2049.github.io/atom.xml',
        'https://feeds2.feedburner.com/programthink',
        'http://cnpolitics.org/feed/',
        'https://chengbao.bitcron.com/feed',
        'https://jesor.me/feed.xml',
        'https://manjusaka.itscoder.com/atom.xml',
        'https://rsshub.avosapps.us/zzz/category/shishipinglun?limit=3',
        'https://rsshub.avosapps.us/zzz/category/meiriyijian?limit=3',
        'https://rsshub.avosapps.us/zzz/category/suixinzatan?limit=3',
        'https://rsshub.avosapps.us/zzz/category/jingcaituijian?limit=3',
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