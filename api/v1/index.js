'use strict';

const router = require('express').Router();
const request = require('request');
const restaurant = require('./restaurant');
const activities = require('./activities');
const redirectBook = require('./redirectBook');

const uplabsAll = require('./uplabs/all');
const uplabsiOS = require('./uplabs/ios');
const uplabsAndroid = require('./uplabs/android');
const uplabsAnimation = require('./uplabs/animation');
const uplabsRefreshOSS = require('./uplabs/refreshOSS');
const uplabsPost = require('./uplabs/post');
const uplabsCollection = require('./uplabs/collection');
const uplabsCollections = require('./uplabs/collections');
const uplabsAuthor = require('./uplabs/author');

const deploy = require('./deploy');

const {
    today: getTodayStatusLog,
    history: getHistoryStatusLog,
    update: updateTodayStatusLog
} = require('./dailyStatusLog');

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
    'allNodes': v2exAllNodes,
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

router.get(/^\/uplabs\/uplabs_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsAll);
router.get(/^\/uplabs\/uplabs_ios_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsiOS);
router.get(/^\/uplabs\/uplabs_android_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsAndroid);
router.get(/^\/uplabs\/uplabs_animation_(\d+)\.json$/, uplabsAnimation);
router.get(/^\/uplabs\/author\/(.+)\.json$/, uplabsAuthor);
router.get(/^\/uplabs\/(\d+)\.json$/, uplabsPost);
router.get('/uplabs/collection', uplabsCollection);
router.get('/uplabs/collections/:name', uplabsCollections);
router.get('/uplabs/refreshOSS', uplabsRefreshOSS);

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

router.post('/deploy', deploy);

router.get('/dailyStatusLog/today', getTodayStatusLog);
router.post('/dailyStatusLog/update', updateTodayStatusLog);
router.get('/dailyStatusLog/history/:days', getHistoryStatusLog);

router.get('/bigText', require('./bigText'));
router.get('/zhihu/question/:id', require('./zhihu/question'));

router.post('/azbook', require('./azbook'));

router.get('/ping', require('./ping'));

router.get('/dearmeal/list', require('./dearmeal/list'));
router.get('/dearmeal/detail/:id', require('./dearmeal/detail'));

router.get('/alipayscheme/list', require('./alipayscheme/list'));
router.post('/alipayscheme/update', require('./alipayscheme/update'));

router.get('/proxyimage', async (req, res) => {
    const { url } = req.query
    const headers = {};

    if (req.headers.range) {
        headers.Range = req.headers.range;
    }

    request.get({
        url,
        headers,
    }).pipe(res);
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
router.get('/nhk/easynews/article/:id', require('./nhk/easynews-article'));
router.get('/nhk/webnews', require('./nhk/webnews'));
router.get('/nhk/webnews/article/:id', require('./nhk/webnews-article'));

router.get('/server-status/storage', require('./server-status/storage'));
router.get('/os', require('./os'));
router.post('/sandbox', require('./sandbox'));
router.get('/notes', require('./notes/get'));
router.post('/note', require('./notes/post'));

module.exports = router;
