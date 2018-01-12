'use strict';

const router = require('express').Router();
const restaurant = require('./restaurant');
const menu = require('./menu');
const activities = require('./activities');
const updateBook = require('./updateBook');
const notifyBook = require('./notifyBook');
const redirectBook = require('./redirectBook');
const traceBook = require('./traceBook');
const updateYoupin = require('./updateYoupin');
const updateEle = require('./updateEle');

const uplabsAll = require('./uplabs/all');
const uplabsiOS = require('./uplabs/ios');
const uplabsAndroid = require('./uplabs/android');
const uplabsRefreshOSS = require('./uplabs/refreshOSS');

router.get('/restaurant', restaurant);
router.get('/menu/:name', menu);
router.get('/activities', activities);
router.get('/book/update', updateBook);
router.get('/book/notify', notifyBook);
router.get('/book/redirect', redirectBook);
router.get('/book/trace', traceBook);
router.get('/youpin/update', updateYoupin);
router.get('/ele/update', updateEle);

router.get(/^\/uplabs\/uplabs_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsAll);
router.get(/^\/uplabs\/uplabs_ios_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsiOS);
router.get(/^\/uplabs\/uplabs_android_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsAndroid);
router.get('/uplabs/refreshOSS', uplabsRefreshOSS);

module.exports = router;