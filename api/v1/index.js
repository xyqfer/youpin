'use strict';

const router = require('express').Router();
const restaurant = require('./restaurant');
const menu = require('./menu');
const activities = require('./activities');
const redirectBook = require('./redirectBook');
const traceBook = require('./traceBook');
const updateYoupin = require('./updateYoupin');
const updateEle = require('./updateEle');

const uplabsAll = require('./uplabs/all');
const uplabsiOS = require('./uplabs/ios');
const uplabsAndroid = require('./uplabs/android');
const uplabsAnimation = require('./uplabs/animation');
const uplabsRefreshOSS = require('./uplabs/refreshOSS');
const uplabsPost = require('./uplabs/post');
const uplabsCollection = require('./uplabs/collection');
const uplabsCollections = require('./uplabs/collections');
const uplabsAuthor = require('./uplabs/author');

const updateV2EX = require('./updateV2EX');
const updateDaily = require('./updateDaily');
const updateCodepen = require('./updateCodepen');

const getTodayStatusLog = require('./dailyStatusLog/today');
const updateTodayStatusLog = require('./dailyStatusLog/update');
const getHistoryStatusLog = require('./dailyStatusLog/history');

router.get('/restaurant', restaurant);
router.get('/menu/:name', menu);
router.get('/activities', activities);

router.get('/book/redirect', redirectBook);
router.get('/book/trace', traceBook);

router.get('/youpin/update', updateYoupin);
router.get('/ele/update', updateEle);

router.get('/v2ex/hot', updateV2EX);
router.get('/codepen/update', updateCodepen);
router.get('/update/daily', updateDaily);

router.get(/^\/uplabs\/uplabs_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsAll);
router.get(/^\/uplabs\/uplabs_ios_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsiOS);
router.get(/^\/uplabs\/uplabs_android_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsAndroid);
router.get(/^\/uplabs\/uplabs_animation_(\d+)\.json$/, uplabsAnimation);
router.get(/^\/uplabs\/author\/(.+)\.json$/, uplabsAuthor);
router.get(/^\/uplabs\/(\d+)\.json$/, uplabsPost);
router.get('/uplabs/collection', uplabsCollection);
router.get('/uplabs/collections/:name', uplabsCollections);
router.get('/uplabs/refreshOSS', uplabsRefreshOSS);

router.get('/dailyStatusLog/today', getTodayStatusLog);
router.post('/dailyStatusLog/update', updateTodayStatusLog);
router.get('/dailyStatusLog/history/:days', getHistoryStatusLog);

module.exports = router;