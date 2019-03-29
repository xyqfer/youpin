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
        'https://rsshub.avosapps.us/sspai/matrix',
        'https://rsshub.avosapps.us/anitama/channel?limit=5',
        'https://luolei.org/rss/',
        'https://rsshub.avosapps.us/qdaily/specialcolumn/63',
        // 'https://rsshub.avosapps.us/reuters/investigates?limit=3',
        'https://rsshub.avosapps.us/tianfateng/tag/books',
        // 'https://www.gatesnotes.com/rss',
        // 'https://museelogue.fireside.fm/rss',
        // 'https://rsshub.avosapps.us/socialbeta/tag/%E7%8B%AC%E8%A7%92%E4%BC%98%E8%8D%90?limit=1',
        // 'https://rsshub.avosapps.us/socialbeta/tag/%E5%93%81%E7%89%8C%E5%88%B6%E7%89%87%E5%8E%82?limit=1',
        // 'https://rsshub.avosapps.us/socialbeta/tag/%E8%90%A5%E9%94%80%E5%91%A8%E6%8A%A5?limit=1',
        // 'https://rsshub.avosapps.us/socialbeta/tag/%E6%A1%88%E4%BE%8B%E4%B8%80%E5%91%A8?limit=1',
        // 'https://rsshub.avosapps.us/socialbeta/tag/%E7%94%B2%E6%96%B9%E4%B9%99%E6%96%B9?limit=1',
        'https://rsshub.avosapps.us/sobooks/newest',
        'https://rsshub.avosapps.us/amazon/newbook',
        'https://rsshub.avosapps.us/nfcmag/category/2?limit=5',
        'https://rsshub.avosapps.us/nfcmag/category/4?limit=5',
        'https://rsshub.avosapps.us/songshuhui/category/psychology?limit=5',
        'https://rsshub.avosapps.us/songshuhui/category/medi?limit=5',
        'https://rsshub.avosapps.us/matters/latest',
        'https://rsshub.avosapps.us/iresearch/report',
        'https://rsshub.avosapps.us/mobdata/report',
        // 'https://rsshub.avosapps.us/ukchina/horizon',
        // 'https://rsshub.app/youtube/channel/UCb_CkUzhPsHXdrpQl9Zg5aA',
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