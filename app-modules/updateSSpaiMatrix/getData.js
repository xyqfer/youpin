'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const Parser = require('rss-parser');
    const flatten = require('lodash/flatten');
    const parser = new Parser();

    const urls = [
        'https://rsshub.avosapps.us/patreon/posts/1968567?limit=1',
        'https://rsshub.avosapps.us/sspai/matrix',
        'https://applefans.today/feed/',
        // 'http://www.ixiqi.com/feed',
        // 'https://rsshub.avosapps.us/anitama/channel?limit=5',
        'https://luolei.org/rss/',
        // 'https://rsshub.avosapps.us/qdaily/specialcolumn/63',
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
        // 'https://rsshub.avosapps.us/kgbook/newest',
        // 'https://rsshub.avosapps.us/iamtxt/newest',
        // 'https://www.duyixing.com/feed',
        'https://rsshub.avosapps.us/amazon/newbook',
        'https://rsshub.avosapps.us/bookdao/subject/%E6%96%B0%E7%9F%A5',
        'https://rsshub.avosapps.us/bookdao/subject/%E7%94%9F%E6%B4%BB',
        'https://rsshub.avosapps.us/bookdao/subject/%E7%A4%BE%E7%A7%91',
        'https://rsshub.avosapps.us/nfcmag/category/2?limit=5',
        'https://rsshub.avosapps.us/nfcmag/category/4?limit=5',
        'https://rsshub.avosapps.us/songshuhui/category/psychology?limit=5',
        'https://rsshub.avosapps.us/songshuhui/category/medi?limit=5',
        'https://www.darmau.com/rss/',
        // 'https://rsshub.avosapps.us/ugediao/category/software?limit=3',
        // 'https://rsshub.avosapps.us/matters/latest',
        // 'https://rsshub.avosapps.us/mirrormedia/section/596441604bbe120f002a3197',
        // 'https://rsshub.avosapps.us/mirrormedia/section/5964418a4bbe120f002a3198',
        'https://rsshub.avosapps.us/kedo/discovery/health',
        // 'https://rsshub.avosapps.us/ngocn/home?limit=3',
        // 'https://rsshub.avosapps.us/iresearch/report',
        // 'https://rsshub.avosapps.us/mobdata/report',
        'https://rsshub.avosapps.us/touduyu/sites',
        // 'https://rsshub.avosapps.us/mit/graduateadmissions/index?limit=5',
        'https://rsshub.avosapps.us/zhaodao-ai/newest',
        'https://jp.sonic-learning.com/feed/',
        'https://rsshub.avosapps.us/colanekojp/blog?limit=3',
        'https://rsshub.avosapps.us/github/file/leancloud/docs/master/views/leanengine_webhosting_guide.tmpl',
        'https://japanjobs.dev/jobs.xml',
        // 'https://rsshub.avosapps.us/ukchina/horizon',
        // 'https://rsshub.app/youtube/channel/UCb_CkUzhPsHXdrpQl9Zg5aA',
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
            console.error(url);
            return [];
        }
    });

    return flatten(data);
};