'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const {
        params
    } = require('app-libs');

    const urls = [
        // 'http://fex.baidu.com/feed.xml',
        'https://www.zhangxinxu.com/wordpress/feed/',
        'http://taobaofed.org/atom.xml',
        'https://blog.techbridge.cc/atom.xml',
        'https://www.w3cplus.com/rss.xml',
        'http://www.alloyteam.com/feed/',
        'https://kiwenlau.com/atom.xml',
        'https://rsshub.avosapps.us/fundebug/latest?limit=5',
        'https://www.jackpu.com/rss/',
        'https://techblog.toutiao.com/rss/',
        'https://github.com/framework7io/framework7/releases.atom',
        'http://liqi.io/feed/',
        'http://www.zreading.cn/feed',
        'https://paper.seebug.org/rss/',
        'https://coolshell.cn/feed',
        'https://www.codesky.me/feed/',
        // 'https://gank.io/feed',
        // 'http://zuimeia.com/feed/',
        'https://rsshub.app/douban/explore',
        'https://rsshub.avosapps.us/wechat/wasi/5ba55623244d4e5506b732c2?filter=%E4%B8%80%E5%91%A8%E7%83%AD%E9%97%A8%E5%9B%BE%E4%B9%A6&limit=2',
        'https://rsshub.avosapps.us/wechat/wasi/5b5ddde9244d4e4db43f7d07?limit=5',
        'https://rsshub.avosapps.us/dapenti/tugua?limit=3',
        'https://rsshub.avosapps.us/dapenti/blog/184?limit=3',
        // 'http://www.vice.cn/read/rss',
        // 'https://rsshub.app/wechat/miniprogram/plugins',
        // 'https://rsshub.app/miniapp/article/recommendation',
        'http://damobing.com/?feed=rss2',
        'https://onevcat.com/feed.xml',
        'http://blog.cnbang.net/feed/',
        'https://rsshub.avosapps.us/zhihu/zhuanlan/lishuhang?limit=3',
        // 'https://rsshub.avosapps.us/github/issue/BUCT-Vision/weekly-review',
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
                    url: $item.find('link').text().replace('http://localhost:4000', 'http://fex.baidu.com'),
                    title: $item.find('title').text()
                })
            });

            $('entry').each(function() {
                const $item = $(this);

                result.push({
                    url: $item.find('link').attr('href'),
                    title: $item.find('title').text()
                })
            });

            return result;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data).map(({ title, url }) => {
        return {
            title,
            url,
        };
    });
};