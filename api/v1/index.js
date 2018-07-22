'use strict';

const router = require('express').Router();
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
    'allNodes': v2exAllNodes,
} = require('./v2ex');

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

router.post('/deploy', deploy);

router.get('/dailyStatusLog/today', getTodayStatusLog);
router.post('/dailyStatusLog/update', updateTodayStatusLog);
router.get('/dailyStatusLog/history/:days', getHistoryStatusLog);

module.exports = router;