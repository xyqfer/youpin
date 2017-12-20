'use strict';

const router = require('express').Router();
const restaurant = require('./restaurant');
const menu = require('./menu');
const activities = require('./activities');
const updateBook = require('./updateBook');
const notifyBook = require('./notifyBook');
const updateYoupin = require('./updateYoupin');
const updateEle = require('./updateEle');

router.get('/restaurant', restaurant);
router.get('/menu/:name', menu);
router.get('/activities', activities);
router.get('/book/update', updateBook);
router.get('/book/notify', notifyBook);
router.get('/youpin/update', updateYoupin);
router.get('/ele/update', updateEle);

module.exports = router;