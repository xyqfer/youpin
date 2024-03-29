'use strict';

module.exports = async () => {
    const Parser = require('rss-parser');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = [
        'https://terminus2049.github.io/atom.xml',
        'https://feeds2.feedburner.com/programthink',
        // 'http://cnpolitics.org/feed/',
        'https://chengbao.bitcron.com/feed',
        'https://jesor.me/feed.xml',
        'https://manjusaka.itscoder.com/atom.xml',
        // 'https://rsshub.avosapps.us/zzz/category/shishipinglun?limit=3',
        // 'https://rsshub.avosapps.us/zzz/category/meiriyijian?limit=3',
        // 'https://rsshub.avosapps.us/zzz/category/suixinzatan?limit=3',
        'https://rsshub.avosapps.us/zzz/category/jingcaituijian?limit=3',
        'https://github.com/HuijieL/RenZhengfei/commits.atom',
        'https://rsshub.avosapps.us/custom/http%3A%2F%2Fwww.googlevoice.net%2Ffeed',
        // 'https://rsshub.avosapps.us/custom/https%3A%2F%2Fibdkopi6vn.erjsnfs.com%2Fapi%2Fv1%2Fproxyimage%3Furl%3Dhttps%253A%252F%252Fwww.sunjiwen.com%252Ffeed%252F?limit=3',
        'https://rsshub.avosapps.us/custom/https%3A%2F%2Funee.wang%2Ffeed?limit=1',
        // 'https://www.chinesepen.org/feed',
        'https://rsshub.avosapps.us/custom/https%3A%2F%2Fwww.fbbi.pw%2Ffeed?limit=1',
        // 'https://rsshub.avosapps.us/tophub/7GdaK3YoQy?filter=%E6%99%A8%E8%AE%AF',
        'https://rsshub.avosapps.us/pintu360/search/%E9%80%94%E5%B0%8F%E8%90%8C?filter=%E6%99%A8%E8%AE%AF&limit=2',
        // 'https://rsshub.avosapps.us/custom/https%3A%2F%2Fwww.twreporter.org%2Fa%2Frss2.xml?limit=5',
        'https://rsshub.avosapps.us/tophub/NRrvW3v5zg',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const feed = await parser.parseURL(url);

            return feed.items.map((item) => ({
                title: item.title,
                url: item.link,
                summary: '',
            }));
        } catch (err) {
            console.error(err);
            console.error(url);
            return [];
        }
    });

    return flatten(data);
};
