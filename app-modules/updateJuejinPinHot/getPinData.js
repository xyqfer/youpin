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
        // 'https://rsshub.avosapps.us/juejin/pins',
        // 'https://rsshub.avosapps.us/coding/pp/latest',
        // 'https://rsshub.avosapps.us/ifanr2/digest',
        // 'https://rsshub.avosapps.us/weseepro/newest',
        // 'https://rsshub.avosapps.us/weseepro/circle',
        'https://rsshub.avosapps.us/weseepro/channel/a5ec0d9dbce04783b1e8bbdbf271011b',
        'https://rsshub.avosapps.us/weseepro/channel/c380a979b2b94a3593a52a8a65292a2b',
        'https://rsshub.avosapps.us/weseepro/channel/15921728bf1a4c5d9b0233736c8b27d0',
        'https://rsshub.avosapps.us/weseepro/channel/a28e8c9ec0ce47b3bf54fa4e2f05f4ca',
        'https://rsshub.avosapps.us/weseepro/channel/ee6a49dc0dd04218951ce454411998de',
        'https://rsshub.avosapps.us/weseepro/channel/728034746d754ad89fc2186c3f41d363',
        'https://rsshub.avosapps.us/weseepro/channel/c7bee1a61708416380442f13f2db7fa3',
        'https://rsshub.avosapps.us/ifanr2/dasheng?limit=5',
        // 'https://rsshub.avosapps.us/ifanr2/latest',
        // 'https://a.jiemian.com/index.php?m=article&a=rss',
        'https://rsshub.avosapps.us/weibo/user/1614282004',
        'https://rsshub.avosapps.us/weibo/user/1684197391',
        'https://rsshub.avosapps.us/bilibili/user/video/28152409?limit=1',
        // 'https://rsshub.avosapps.us/twitter/user/BBCChina',
        // 'https://rsshub.avosapps.us/weibo/user/5339148412',
        // 'https://rsshub.avosapps.us/weibo/user/5378866839/1076035378866839',
        // 'https://rsshub.avosapps.us/twitter/user/Medium',
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