'use strict';

module.exports = async () => {
  const Parser = require('rss-parser');
  const Promise = require('bluebird');
  const flatten = require('lodash/flatten');
  let parser = new Parser();

  const urls = [
    'http://rsshub.avosapps.us/leancloud/forum/11?limit=5',
    'https://www.zhangxinxu.com/wordpress/feed/',
    'https://rsshub.avosapps.us/taobaofed/blog',
    'https://rsshub.avosapps.us/techbridge/blog',
    // 'https://rsshub.avosapps.us/upyun/tech',
    'https://rsshub.avosapps.us/timilong/blog',
    'https://dnc1994.com/atom.xml',
    // 'https://www.w3cplus.com/rss.xml',
    'http://www.alloyteam.com/feed/',
    // 'https://rsshub.avosapps.us/fundebug/latest?limit=5',
    'https://rsshub.avosapps.us/yuque/book/yubo/words/126420',
    // 'https://51.ruyo.net/feed/',
    'https://www.jackpu.com/rss/',
    'https://techblog.toutiao.com/rss/',
    'https://blog.imalan.cn/feed',
    'https://github.com/framework7io/framework7/releases.atom',
    'http://www.520monkey.com/feed',
    'https://coolshell.cn/feed',
    'https://www.codesky.me/feed/',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fimjad.cn%2Ffeed?limit=1',
    'https://rsshub.avosapps.us/zhihu/zhuanlan/mm-fe?limit=2',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fwww.quirksmode.org%2Fblog%2Fatom.xml?limit=1',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fwww.ncameron.org%2Fblog%2Frss%2F?limit=1',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fwww.imperialviolet.org%2Fiv-rss.xml?limit=1',
    'https://www.nuist.today/rss2.xml',
    'https://rsshub.avosapps.us/custom/http%3A%2F%2Fblog.dngz.net%2Ffeed?limit=3',
    'http://damobing.com/?feed=rss2',
    'https://onevcat.com/feed.xml',
    'http://blog.cnbang.net/feed/',
    'https://tech.youzan.com/rss/',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fsexywp.com%2Ffeed?limit=2',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Ftypeblog.net%2Frss?limit=2',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fblanboom.org%2Ffeed%2F?limit=2',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fwww.moeelf.com%2Ffeed%2F?limit=3',
    'https://www.logcg.com/feed',
    'https://miao.li/index.xml',
    'https://www.xcnte.com/feed/',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fhunterx.xyz%2Fatom.xml?limit=3',
    'https://qust.me/atom.xml',
    'https://rsshub.avosapps.us/barryliu1995/blog?limit=3',
    'https://www.bboysoul.com/atom.xml',
    'https://www.hchstudio.cn/atom.xml',
    'https://www.bennythink.com/feed',
    'https://luodao.me/rss.html',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fblog.gslin.org%2Ffeed%2F?limit=5',
    'https://pockies.github.io/feed.xml',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fpoplite.xyz%2Ffeed.xml?limit=1',
    'https://rsshub.avosapps.us/meicai/latest',
    'https://rsshub.avosapps.us/scarletsky/blog?limit=5',
    'https://rsshub.avosapps.us/jartto/blog?limit=3',
    // 'https://rsshub.avosapps.us/ioin/wiki',
    // 'https://rsshub.avosapps.us/yq/publication/14?lilmit=3',
    // 'https://rsshub.avosapps.us/yq/publication/19?lilmit=3',
    // 'https://rsshub.avosapps.us/yq/publication/12?lilmit=3',
    // 'https://rsshub.avosapps.us/yq/publication/5?lilmit=3',
    // 'https://rsshub.avosapps.us/yq/publication/2?lilmit=3',
    // 'https://rsshub.avosapps.us/yq/publication/22?lilmit=3',
    'http://www.raychase.net/feed',
    'https://yrq110.me/index.xml',
    'https://rsshub.avosapps.us/lyric/feed',
    'https://webplatform.news/feed.xml',
    'https://sizovs.net/feed.xml',
    'https://rsshub.avosapps.us/arcentry/blog?limit=3',
    'https://rsshub.avosapps.us/rachelbythebay/feed?limit=3',
    'https://rsshub.avosapps.us/google/developers/web?limit=3',
    'https://rsshub.avosapps.us/v8/features',
    'https://rsshub.avosapps.us/webkit/blog?limit=3',
    'https://rsshub.avosapps.us/mozilla/blog?limit=3',
    'https://rsshub.avosapps.us/mozilla/hacks?limit=3',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fmozillagfx.wordpress.com%2Ffeed%2F?limit=1',
    'https://rsshub.avosapps.us/wechat/miniprogram/developers?limit=3',
    'https://rsshub.avosapps.us/custom/https%3A%2F%2Fwww.runningcheese.com%2Ffeed?limit=3',
    // 'https://rsshub.avosapps.us/medium/user/netflix-techblog?limit=3',
    'https://rsshub.avosapps.us/medium/user/hulis-blog?limit=3',
    'https://rsshub.avosapps.us/medium/user/@yestyle?limit=3',
    'https://rsshub.avosapps.us/github/issue/aszx87410/blog?limit=3',
    // 'http://rsshub.avosapps.us/zapier/blog/recent?limit=3',
    // 'https://rsshub.avosapps.us/facebook/newsroom/news?limit=3',
    'https://rsshub.avosapps.us/opera/blog?limit=3',
    'https://matthewstrom.com/feed.xml',
    'https://reactjs.org/feed.xml',
    'https://lob.com/blog/rss',
    // 'https://jsfeeds.com/feed',
    // 'https://itnext.io/feed',
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