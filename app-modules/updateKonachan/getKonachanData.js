'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const cheerio = require('cheerio');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const {
        params
    } = require('app-libs');

    const urls = [
        'https://rsshub.app/konachan/post/popular_recent',
        // 'https://rsshub.app/yande.re/post/popular_recent',
        'https://rsshub.app/imuseum/guangzhou/all',
        'https://rsshub.app/mi/crowdfunding',
        'https://rsshub.app/mi/youpin/crowdfunding',
        'https://rsshub.app/rsshub/rss',
        'https://rsshub.app/douyin/user/97611960349',
        'https://rsshub.app/twitter/user/ruanyf',
        'https://rsshub.app/bilibili/partion/178',
        'https://rsshub.app/douban/explore',
        'https://rsshub.app/juejin/trending/all/weekly',
        'https://rsshub.app/pediy/topic/ios/latest',
        'https://rsshub.app/pediy/topic/android/latest',
        'https://rsshub.app/pigtails',
        'https://rsshub.app/guokr/scientific',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const xmlString = await rp.get({
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

            $('item').each(function() {
                const $item = $(this);

                result.push({
                    url: $item.find('link').text(),
                    title: $item.find('title').text(),
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