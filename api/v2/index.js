'use strict';
const router = require('express').Router();
const menu = require('./menu');

router.get('/menu/:name', menu);

module.exports = router;
