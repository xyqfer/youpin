'use strict';

module.exports = async () => {
  const Parser = require('rss-parser');
  const Promise = require('bluebird');
  const flatten = require('lodash/flatten');
  let parser = new Parser();

  const urls = [
    'https://www.zhangxinxu.com/wordpress/feed/',
    'http://taobaofed.org/atom.xml',
    'https://blog.techbridge.cc/atom.xml',
    'https://www.w3cplus.com/rss.xml',
    'http://www.alloyteam.com/feed/',
    'https://rsshub.avosapps.us/fundebug/latest?limit=5',
    'https://www.jackpu.com/rss/',
    'https://techblog.toutiao.com/rss/',
    'https://github.com/framework7io/framework7/releases.atom',
    'https://coolshell.cn/feed',
    'https://www.codesky.me/feed/',
    'http://damobing.com/?feed=rss2',
    'https://onevcat.com/feed.xml',
    'http://blog.cnbang.net/feed/',
    'https://rsshub.avosapps.us/meicai/latest',
    'https://rsshub.avosapps.us/ioin/wiki',
    'https://rsshub.avosapps.us/rachelbythebay/feed?limit=3',
    'https://rsshub.avosapps.us/google/developers/web?limit=3',
    'https://rsshub.avosapps.us/webkit/blog?limit=3',
    'https://rsshub.avosapps.us/mozilla/blog?limit=3',
    'https://rsshub.avosapps.us/mozilla/hacks?limit=3',
    'https://rsshub.avosapps.us/wechat/miniprogram/developers?limit=3',
    'https://rsshub.avosapps.us/medium/user/netflix-techblog?limit=3',
    'https://rsshub.avosapps.us/facebook/newsroom/news?limit=3',
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