'use strict';
const router = require('express').Router();
const apiV1 = require('./v1/index');
const apiV2 = require('./v2/index');

router.use('/v1', apiV1);
router.use('/v2', apiV2);

module.exports = router;