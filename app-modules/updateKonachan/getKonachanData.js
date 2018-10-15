'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const {
        params
    } = require('app-libs');

    const urls = [
        'https://rsshub.app/konachan/post/popular_recent.json',
        // 'https://rsshub.app/yande.re/post/popular_recent.json',
        'https://rsshub.app/imuseum/guangzhou/all.json',
        'https://rsshub.app/mi/crowdfunding.json',
        'https://rsshub.app/rsshub/rss.json',
        'https://rsshub.app/douyin/user/97611960349.json',
        'https://rsshub.app/twitter/user/ruanyf.json',
        'https://rsshub.app/bilibili/partion/178.json',
        'https://rsshub.app/douban/explore.json',
        'https://rsshub.app/juejin/trending/all/weekly.json',
        'https://rsshub.app/pediy/topic/ios/latest.json',
        'https://rsshub.app/pediy/topic/android/latest.json',
        'https://rsshub.app/pigtails.json',
        'https://rsshub.app/guokr/scientific.json',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const result = await rp.get({
                json: true,
                uri: url,
                headers: {
                    'User-Agent': params.ua.pc
                },
            });

            return result.items;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data).map(({ title, summary, url }) => {
        return {
            title,
            url,
            summary,
        };
    });
};