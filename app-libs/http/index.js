'use strict';

let rp = require('request-promise');
const params = require('../params');

if (params.env.isDev) {
  // rp = rp.defaults({
  //   proxy: 'http://127.0.0.1:1087'
  // });
}

module.exports = rp;