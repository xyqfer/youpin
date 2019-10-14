'use strict';

const rp = require('request-promise');
const params = require('../params');

const http = rp.defaults({
    headers: {
        'User-Agent': params.ua.pc,
    },
});
module.exports = http;
