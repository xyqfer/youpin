'use strict';

/**
 * google 翻译
 */

module.exports = (text = '') => {
  const Promise = require('bluebird');
  const rp = require('request-promise');
  const { params } = require('app-libs');

  const form = {
    dt: 't',
    tl: 'zh-CN',
    ie: 'UTF-8',
    sl: 'auto',
    client: 'ia',
    dj: '1',
    q: text,
  };

  return Promise.reduce(['cn', 'com'], function(total, current) {
    if (!total) {
      return rp.post({
        json: true,
        uri: `https://translate.google.${current}/translate_a/single`,
        form,
        headers: {
          'User-Agent': params.ua.mobile,
        },
      }).then((resp) => {
        return resp;
      }).catch((err) => {
        console.log(err);
        return null;
      });
    } else {
      return total;
    }
  }, null);
};