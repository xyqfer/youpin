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
        // 'https://rsshub.app/konachan/post/popular_recent',
        // 'https://rsshub.app/yande.re/post/popular_recent',
        'https://rsshub.app/imuseum/guangzhou/all',
        'https://rsshub.app/mi/crowdfunding',
        'https://rsshub.app/mi/youpin/crowdfunding',
        // 'https://rsshub.app/rsshub/rss',
        // 'https://rsshub.app/douyin/user/97611960349',
        'https://rsshub.app/twitter/user/ruanyf',
        // 'https://rsshub.app/bilibili/partion/178',
        // 'https://rsshub.app/juejin/trending/all/weekly',
        // 'https://rsshub.app/pediy/topic/ios/latest',
        // 'https://rsshub.app/pediy/topic/android/latest',
        // 'https://rsshub.app/pigtails',
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
        // 'https://rsshub.app/xiachufang/popular/hot',
        // 'https://rsshub.app/xiachufang/popular/pop',
        // 'https://rsshub.app/xiachufang/popular/week',
        // 'https://rsshub.app/xiachufang/popular/rising',
        // 'https://rsshub.app/xiachufang/popular/monthhonor',
        'http://3hedashen.net/comments/feed/',
        'https://rsshub.app/miniapp/store/newest',
        'https://rsshub.avosapps.us/zhihu/bookstore/newest',
        'https://rsshub.avosapps.us/coolbuy/newest',
        'https://rsshub.avosapps.us/jsbox/bbs/newest?limit=7',
        'https://rsshub.avosapps.us/baidu/topwords/341',
        'https://rsshub.avosapps.us/enjoy/explore/216',
        'https://rsshub.avosapps.us/enjoy/product/newest/216',
        'https://linux.pictures/feed',
        'https://rsshub.avosapps.us/newseed/invest',
        'https://rsshub.avosapps.us/newseed/quicklook',
        'https://rsshub.avosapps.us/douban/column/24',
        'https://rsshub.avosapps.us/douban/column/20',
        'https://rsshub.avosapps.us/douban/column/33',
        'https://rsshub.avosapps.us/douban/column/40',
        'https://rsshub.avosapps.us/douban/column/49',
        'https://rsshub.avosapps.us/douban/column/35',
        'https://rsshub.avosapps.us/douban/column/36',
        'https://rsshub.avosapps.us/douban/column/37',
        'https://rsshub.avosapps.us/douban/column/44',
        'https://rsshub.avosapps.us/douban/column/45',
        'https://rsshub.avosapps.us/douban/column/48',
        'https://rsshub.avosapps.us/douban/column/54',
        'https://rsshub.avosapps.us/douban/column/58',
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