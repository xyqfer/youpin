'use strict';

module.exports = async () => {
  const Parser = require('rss-parser');
  const Promise = require('bluebird');
  const flatten = require('lodash/flatten');
  const parser = new Parser();

  const urls = [
    'https://feed.pixnet.net/blog/posts/rss/jht',
    'http://liqi.io/feed/',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fchanghai.org%2Ffeed.xml?limit=5',
    'http://yuezhu.org/feed/',
    'http://byte.coffee/feed/podcast/',
    // 'http://www.zreading.cn/feed',
    'https://q.qnmlgb.tech/w/rss/5ba55623244d4e5506b732c2',
    'https://q.qnmlgb.tech/w/rss/5b5ddde9244d4e4db43f7d07',
    'https://q.qnmlgb.tech/w/rss/5c1f9dba497ff40f76dfe68e',
    // 'https://rsshub.avosapps.us/wechat/wasi/5ba55623244d4e5506b732c2?filter=%E4%B8%80%E5%91%A8%E7%83%AD%E9%97%A8%E5%9B%BE%E4%B9%A6&limit=2',
    // 'https://rsshub.avosapps.us/wechat/wasi/5b5ddde9244d4e4db43f7d07?limit=5',
    // 'https://rsshub.avosapps.us/wechat/wasi/5c1f9dba497ff40f76dfe68e?limit=1&filterout=%E5%B0%8F%E8%AF%8D%E8%AF%A6%E8%A7%A3',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fmeipin.im%2Ffeed?limit=1',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2F1078503.org%2Ffeed?limit=5&filterout=%E6%B1%BD%E8%BD%A6',
    'https://qingniantuzhai.com/rss/',
    'https://rsshub.avosapps.us/zhihu/zhuanlan/c_1085975047386050560?limit=1',
    // 'https://rsshub.avosapps.us/yuweining/category/b?limit=1',
    // 'https://rsshub.avosapps.us/yuweining/category/p?limit=1',
    // 'https://rsshub.avosapps.us/yuweining/category/fx?limit=1',
    // 'https://rsshub.avosapps.us/yuweining/category/shipin?limit=1',
    // 'https://rsshub.avosapps.us/ugediao/category/reading?limit=3',
    // 'https://rsshub.avosapps.us/wubiaoqing/home',
    'https://rsshub.avosapps.us/luojilab/poster/picqqAD838qrRSQj76y0XRB?limit=3',
    'https://mizou.org/rss',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fwww.bukaopu.com%2Ffeed%2F?limit=1',
    'https://rsshub.avosapps.us/shuhui/comics/53',
    'https://rsshub.avosapps.us/custom/http%3A%2F%2Fwww.calnewport.com%2Fblog%2Ffeed%2F?limit=1',
    'https://rsshub.avosapps.us/nfpeople/category/1?limit=1',
    'https://rsshub.avosapps.us/nfpeople/category/4?limit=1',
    'https://rsshub.avosapps.us/nfpeople/category/5?limit=3',
    'https://rsshub.avosapps.us/nfpeople/category/6?limit=5',
    'https://rsshub.avosapps.us/nfpeople/category/21?limit=2',
    'https://rsshub.avosapps.us/nfpeople/category/22?limit=2',
    // 'https://rsshub.avosapps.us/tophub/LBwdGx6ePx?limit=5',
    // 'https://rsshub.avosapps.us/tophub/Jb0vmWGeB1?limit=5',
    // 'http://growthbox.net/feed/',
    // 'https://rsshub.avosapps.us/luojilab/course/24/1',
    // 'https://rsshub.avosapps.us/luojilab/course/24/2',
  ];

  const data = await Promise.mapSeries(urls, async (url) => {
    try {
      const feed = await parser.parseURL(url);

      return feed.items.map(item => {
        return {
          title: item.title,
          url: item.link,
        };
      });
    } catch (err) {
      console.error(err);
      console.error(url);
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