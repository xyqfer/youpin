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
        'http://zuimeia.com/feed/',
        // 'https://rsshub.app/yande.re/post/popular_recent',
        'https://rsshub.app/imuseum/guangzhou/all',
        'https://rsshub.app/mi/crowdfunding',
        'https://rsshub.app/mi/youpin/crowdfunding',
        'https://rsshub.app/rsshub/rss',
        // 'https://rsshub.app/douyin/user/97611960349',
        'https://rsshub.app/twitter/user/ruanyf',
        // 'https://rsshub.app/bilibili/partion/178',
        'https://rsshub.app/douban/explore',
        // 'https://rsshub.app/juejin/trending/all/weekly',
        // 'https://rsshub.app/pediy/topic/ios/latest',
        // 'https://rsshub.app/pediy/topic/android/latest',
        'https://rsshub.app/pigtails',
        // 'https://rsshub.app/guokr/scientific',
        'https://rsshub.app/douban/event/hot/118281',
        'https://rsshub.app/sspai/shortcuts',
        'https://rsshub.app/douban/commercialpress/latest',
        'https://rsshub.app/westore/new',
        'https://zh.wikipedia.org/w/api.php?action=featuredfeed&feed=good&feedformat=rss',
        'https://rsshub.app/douban/bookstore',
        'https://rsshub.app/douban/book/rank/fiction',
        'https://rsshub.app/douban/book/rank/nonfiction',
        'https://rsshub.app/baidu/doodles?limit=3',
        'https://rsshub.app/sogou/doodles?limit=3',
        'https://rsshub.app/google/doodles',
        'https://rsshub.app/itjuzi/merge',
        'https://rsshub.app/itjuzi/invest',
        'https://rsshub.app/tanwu/products?limit=5',
        'https://feedx.net/rss/bingwallpaper.xml',
        'https://rsshub.app/wechat/miniprogram/plugins',
        'https://rsshub.app/xiachufang/popular/hot',
        'https://rsshub.app/xiachufang/popular/pop',
        'http://3hedashen.net/comments/feed/',
        'https://rsshub.app/miniapp/article/recommendation',
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