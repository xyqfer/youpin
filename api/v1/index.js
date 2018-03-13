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

router.post('/deploy', deploy);

router.get('/dailyStatusLog/today', getTodayStatusLog);
router.post('/dailyStatusLog/update', updateTodayStatusLog);
router.get('/dailyStatusLog/history/:days', getHistoryStatusLog);

module.exports = router;