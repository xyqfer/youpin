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
const uplabsPushCDN = require('./uplabs/pushCDN');
const uplabsRefreshCDN = require('./uplabs/refreshCDN');

router.get('/restaurant', restaurant);
router.get('/menu/:name', menu);
router.get('/activities', activities);
router.get('/book/update', updateBook);
router.get('/book/notify', notifyBook);
router.get('/book/redirect', redirectBook);
router.get('/book/trace', traceBook);
router.get('/youpin/update', updateYoupin);
router.get('/ele/update', updateEle);
router.get(/^\/uplabs\/uplabs_(\d{4})\-(\d{2})\-(\d{2})_(\d+)\.json$/, uplabsPushCDN);
router.get('/uplabs/refreshCDN', uplabsRefreshCDN);

module.exports = router;