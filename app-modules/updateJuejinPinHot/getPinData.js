'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const {
        params,
        http,
    } = require('app-libs');

    const urls = [
        'https://rsshub.avosapps.us/juejin/pins',
        // 'https://rsshub.avosapps.us/coding/pp/latest',
        // 'https://rsshub.avosapps.us/ifanr2/digest',
        // 'https://rsshub.avosapps.us/weseepro/newest',
        'https://rsshub.avosapps.us/weseepro/circle',
        'https://rsshub.avosapps.us/ifanr2/latest',
        // 'https://a.jiemian.com/index.php?m=article&a=rss',
        'https://rsshub.avosapps.us/weibo/user/1614282004',
        'https://rsshub.avosapps.us/weibo/user/1684197391',
        // 'https://rsshub.app/twitter/user/Medium',
        // 'https://rsshub.avosapps.us/testerhome/newest',
        // 'https://rsshub.avosapps.us/chouti/hot',
        // 'https://rsshub.avosapps.us/kcaibao/newest',
        // 'https://rsshub.avosapps.us/douban/gallery/trending',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const xmlString = await http.get({
                uri: url,
                headers: {
                    'User-Agent': params.ua.pc
                },
            });
            const $ = cheerio.load(xmlString, {
                normalizeWhitespace: true,
                xmlMode: true
            });
            const result = [];

            $('item').each(function () {
                const $item = $(this);

                result.push({
                    url: $item.find('link').text(),
                    title: $item.find('title').text() || '',
                    summary: $item.find('description').text()
                });
            });

            return result;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data);
};