'use strict';

const router = require('express').Router();
const request = require('request');
const restaurant = require('./restaurant');
const activities = require('./activities');
const redirectBook = require('./redirectBook');

const { today: getTodayStatusLog, history: getHistoryStatusLog, update: updateTodayStatusLog } = require('./dailyStatusLog');

const {
    hot: v2exHot,
    new: v2exNew,
    nodes: v2exNodes,
    node: v2exNode,
    t: v2exT,
    tab: v2exTab,
    member: v2exMember,
    memberTopic: v2exMemberTopic,
    memberReply: v2exMemberReply,
    login: v2exLogin,
    logout: v2exLogout,
    initLogin: v2exInitLogin,
    search: v2exSearch,
    recent: v2exRecent,
    checkLogin: v2exCheckLogin,
    tag: v2exTag,
    allNodes: v2exAllNodes,
} = require('./v2ex');

const poliwagRouters = require('./poliwag');
Object.entries(poliwagRouters).forEach(([name, callback]) => {
    let method = 'get';
    if (name === 'translate') {
        method = 'post';
    }

    router[method](`/poliwag/${name}`, callback);
});

const stickerRouters = require('./sticker');
Object.entries(stickerRouters).forEach(([name, callback]) => {
    router.get(`/sticker/${name}`, callback);
});

router.get('/restaurant', restaurant);
router.get('/activities', activities);

router.get('/book/redirect', redirectBook);

router.get('/v2ex/hot', v2exHot);
router.get('/v2ex/new', v2exNew);
router.get('/v2ex/nodes', v2exNodes);
router.get('/v2ex/all-nodes', v2exAllNodes);
router.get('/v2ex/node/:name', v2exNode);
router.get('/v2ex/member/:name', v2exMember);
router.get('/v2ex/member/:name/topic', v2exMemberTopic);
router.get('/v2ex/member/:name/reply', v2exMemberReply);
router.get('/v2ex/t/:id', v2exT);
router.get('/v2ex/tab/:name', v2exTab);
router.get('/v2ex/tag/:name', v2exTag);
router.get('/v2ex/login/init', v2exInitLogin);
router.post('/v2ex/login', v2exLogin);
router.post('/v2ex/logout', v2exLogout);
router.get('/v2ex/search', v2exSearch);
router.get('/v2ex/recent', v2exRecent);
router.get('/v2ex/checkLogin', v2exCheckLogin);

router.get('/dailyStatusLog/today', getTodayStatusLog);
router.post('/dailyStatusLog/update', updateTodayStatusLog);
router.get('/dailyStatusLog/history/:days', getHistoryStatusLog);

router.get('/bigText', require('./bigText'));
router.get('/zhihu/question/:id', require('./zhihu/question'));

router.post('/azbook', require('./azbook'));

router.get('/dearmeal/list', require('./dearmeal/list'));
router.get('/dearmeal/detail/:id', require('./dearmeal/detail'));

router.get('/alipayscheme/list', require('./alipayscheme/list'));
router.post('/alipayscheme/update', require('./alipayscheme/update'));

router.get('/proxyimage', async (req, res) => {
    const { url } = req.query;
    const headers = {
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    };

    if (req.headers.range) {
        headers.Range = req.headers.range;
    }

    request
        .get({
            url,
            headers,
        })
        .pipe(res);
});

router.get('/proxyimage2', async (req, res) => {
    const { url } = req.query;
    const headers = {
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'referer': 'https://book.douban.com/'
    };

    if (req.headers.range) {
        headers.Range = req.headers.range;
    }

    request
        .get({
            url,
            headers,
        })
        .pipe(res);
});

router.get('/readeer/zhihu/list', require('./readeer/zhihu/list'));
router.get('/readeer/zhihu/content', require('./readeer/zhihu/content'));
router.get('/readeer/zhihu/random', require('./readeer/zhihu/random'));
router.get('/readeer/nfcmag/article', require('./readeer/nfcmag/article'));
router.get('/readeer/nfcmag/category', require('./readeer/nfcmag/category'));
router.get('/readeer/nfcmag/content', require('./readeer/nfcmag/content'));
router.get('/readeer/nfcmag/list', require('./readeer/nfcmag/list'));

router.get('/music/update', require('./music/update'));
router.get('/music/random', require('./music/random'));
router.get('/weibo/showData', require('./weibo/showData'));

router.post('/furigana/translate', require('./furigana'));
router.post('/furigana/translate-article', require('./furigana/kuroshiro'));

router.get('/youtube/proxy/:id', require('./youtube/proxy'));
router.get('/youtube/geturl/:id', require('./youtube/geturl'));
router.get('/betterDev/video', require('./betterDev/video'));

router.get('/nhk/easynews', require('./nhk/easynews'));
router.get('/nhk/easynews/wordlist', require('./nhk/easynews-wordlist'));
router.get('/nhk/easynews/article/:id', require('./nhk/easynews-article'));

router.get('/server-status/storage', require('./server-status/storage'));
router.get('/server-status/error', require('./server-status/error'));
router.get('/os', require('./os'));
router.post('/sandbox', require('./sandbox'));
router.get('/notes', require('./notes/get'));
router.post('/note', require('./notes/post'));
router.get('/leetcode/status', require('./leetcode/status'));
router.post('/jp/log', require('./jp/log'));
router.post('/jp/parse', require('./jp/parse'));
router.get('/outline', require('./outline'));
router.get('/wewe/groups', require('./wewe/groups'));
router.get('/wewe/group', require('./wewe/group'));

router.get('/hn/item', require('./hn/item'));
router.get('/hn/news', require('./hn/news'));
router.get('/hn/random', require('./hn/random'));
router.get('/hn/links', require('./hn/links'));
router.get('/hn/story', require('./hn/story'));
router.get('/hn/ask', require('./hn/ask'));
router.get('/hn/askRandom', require('./hn/askRandom'));
router.get('/hn/review', require('./hn/review'));

router.get('/todo/list', require('./todo/list'));
router.post('/todo/add', require('./todo/add'));
router.post('/todo/edit', require('./todo/edit'));
router.post('/todo/delete', require('./todo/delete'));

router.get('/theinitium/article', require('./theinitium/article'));
router.get('/theinitium/channel/:name', require('./theinitium/channel'));

router.get('/substack/article', require('./substack/article'));

router.get('/coolapk/feed/:id', require('./coolapk/feed'));

router.get('/caixin/article', require('./caixin/article'));
router.get('/caixin/magazine', require('./caixin/magazine'));
router.get('/caixin/redirect', require('./caixin/redirect'));
router.get('/caixin/company', require('./caixin/company'));

router.get('/readability/view', require('./readability/view'));

router.get('/screenshot', require('./screenshot'));
router.get('/screenshot2', require('./screenshot/index2'));

router.post('/push', require('./push/index'));

module.exports = router;
