'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const Parser = require('rss-parser');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = [
        // 'https://rsshub.app/konachan/post/popular_recent',
        // 'https://rsshub.app/yande.re/post/popular_recent',
        // 'https://rsshub.app/imuseum/guangzhou/all',
        'https://rsshub.app/mi/crowdfunding',
        'https://rsshub.app/mi/youpin/crowdfunding',
        // 'https://rsshub.app/rsshub/rss',
        // 'https://rsshub.app/douyin/user/97611960349',
        // 'https://rsshub.avosapps.us/twitter/user/ruanyf',
        'https://rsshub.avosapps.us/infoq/topic/3?limit=5',
        // 'https://rsshub.app/bilibili/partion/178',
        // 'https://rsshub.app/juejin/trending/all/weekly',
        // 'https://rsshub.app/pediy/topic/ios/latest',
        // 'https://rsshub.app/pediy/topic/android/latest',
        // 'https://rsshub.app/pigtails',
        // 'https://rsshub.app/guokr/scientific',
        // 'https://rsshub.avosapps.us/jike/topic/square/56d2fabe7cb3331100467e2b',
        // 'https://rsshub.app/douban/explore',
        // 'https://rsshub.app/douban/event/hot/118281',
        // 'https://rsshub.app/sspai/shortcuts',
        // 'https://rsshub.app/douban/commercialpress/latest',
        // 'https://rsshub.app/westore/new',
        // 'https://zh.wikipedia.org/w/api.php?action=featuredfeed&feed=good&feedformat=rss',
        'https://rsshub.app/douban/bookstore',
        // 'https://rsshub.app/douban/book/rank/fiction',
        // 'https://rsshub.app/douban/book/rank/nonfiction',
        // 'https://rsshub.app/baidu/doodles?limit=3',
        // 'https://rsshub.app/sogou/doodles?limit=3',
        // 'https://rsshub.app/google/doodles',
        // 'https://rsshub.app/itjuzi/merge',
        // 'https://rsshub.app/itjuzi/invest',
        // 'https://rsshub.app/tanwu/products?limit=5',
        'https://feedx.net/rss/bingwallpaper.xml',
        'https://rsshub.avosapps.us/natgeo/dailyphoto',
        // 'https://rsshub.app/xiachufang/popular/hot',
        // 'https://rsshub.app/xiachufang/popular/pop',
        // 'https://rsshub.app/xiachufang/popular/week',
        // 'https://rsshub.app/xiachufang/popular/rising',
        // 'https://rsshub.app/xiachufang/popular/monthhonor',
        // 'https://rsshub.avosapps.us/3hedashen/comment?limit=3&filter=%E6%96%B9%E8%A8%80',
        // 'https://rsshub.app/miniapp/store/newest',
        // 'https://rsshub.avosapps.us/zhihu/bookstore/newest',
        // 'https://rsshub.avosapps.us/ilixiangguo/newest',
        // 'https://rsshub.avosapps.us/coolbuy/newest',
        // 'https://rsshub.avosapps.us/jd/crowdfunding/10',
        // 'https://rsshub.avosapps.us/taobao/crowdfunding/tech',
        // 'https://rsshub.avosapps.us/taobao/crowdfunding/book',
        'https://rsshub.avosapps.us/ideebank/idea',
        'https://rsshub.avosapps.us/ideebank/news?filter=IdeeBank%E6%AF%8F%E5%91%A8%E7%81%B5%E6%84%9F%E9%A1%B9%E7%9B%AE%E8%BF%9B%E5%B1%95%E6%8A%A5%E5%91%8A',
        // 'https://rsshub.avosapps.us/jsbox/bbs/newest?limit=7',
        // 'https://rsshub.avosapps.us/baidu/topwords/341',
        // 'https://rsshub.avosapps.us/enjoy/explore/216',
        // 'https://rsshub.avosapps.us/enjoy/product/newest/216',
        // 'https://linux.pictures/feed',
        // 'https://rsshub.avosapps.us/newseed/invest',
        // 'https://cn.nytimes.com/rss/',
        // 'https://rsshub.avosapps.us/twitter/user/ChineseWSJ',
        // 'https://rsshub.avosapps.us/jiemian/list/53?limit=3',
        // 'https://rsshub.avosapps.us/newseed/quicklook',
        'https://www.douban.com/feed/people/shjifeng/notes',
        'https://rsshub.avosapps.us/douban/column/24',
        // 'https://rsshub.avosapps.us/bioon/newest',
        // 'https://rsshub.avosapps.us/wsj/video/china?limit=3',
        // 'https://rsshub.avosapps.us/qdaily/tag/594?limit=5',
        // 'https://rsshub.avosapps.us/qdaily/tag/1068?limit=5',
        // 'https://rsshub.avosapps.us/readmoo/category/reading-and-life%7Cdigest?limit=5',
        // 'https://rsshub.avosapps.us/douban/column/20',
        // 'https://rsshub.avosapps.us/douban/column/33',
        // 'https://rsshub.avosapps.us/douban/column/40',
        // 'https://rsshub.avosapps.us/douban/column/49',
        // 'https://rsshub.avosapps.us/douban/column/35',
        // 'https://rsshub.avosapps.us/douban/column/36',
        // 'https://rsshub.avosapps.us/douban/column/37',
        // 'https://rsshub.avosapps.us/douban/column/44',
        // 'https://rsshub.avosapps.us/douban/column/45',
        // 'https://rsshub.avosapps.us/douban/column/48',
        // 'https://rsshub.avosapps.us/douban/column/54',
        // 'https://rsshub.avosapps.us/douban/column/58',
        // 'https://rsshub.avosapps.us/douban/column/49?limit=3',
        // 'https://rsshub.avosapps.us/douban/channel/30169684?limit=3',
        // 'https://rsshub.avosapps.us/instagram/user/apple',
        // 'https://rsshub.avosapps.us/instagram/user/9gag',
        // 'https://rsshub.avosapps.us/instagram/user/rejecteddesign',
        'https://rsshub.avosapps.us/instagram/user/beeple_crap?limit=3',
        'https://rsshub.avosapps.us/instagram/user/dailypurrr',
        'https://rsshub.avosapps.us/instagram/user/simonscatofficial?limit=3',
        'https://rsshub.avosapps.us/twitter/user/wabisabipop2?limit=3',
        'https://rsshub.avosapps.us/twitter/user/learn_reading',
        'https://feeds2.feedburner.com/blogspot/hcCL',
        // 'https://rsshub.avosapps.us/muzei/today',
        // 'https://blog.douban.com/feed/',
        // 'https://rsshub.avosapps.us/guanzhi',
        // 'https://rsshub.avosapps.us/lishuhang/clip?limit=3',
        // 'https://rsshub.avosapps.us/infzm/10?limit=3',
        // 'https://rsshub.avosapps.us/infzm/7?limit=5',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const feed = await parser.parseURL(url);

            return feed.items.map(item => {
                return {
                    title: item.title || '',
                    url: item.link,
                    summary: item.content
                };
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data);
};