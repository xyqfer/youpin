'use strict';

/**
 * 登录
 */
module.exports = (req, res) => {
  const rp = require('request-promise').defaults({
    jar: true,
  });
  const { params } = require('app-libs');

  const {
    cookie,
    once,
    key0,
    key1,
    key2,
    value0,
    value1,
    value2,
  } = req.body;
  let formData = {
    once,
    next: '/',
    [key0]: value0,
    [key1]: value1,
    [key2]: value2,
  };

  rp.post({
    uri: 'https://www.v2ex.com/signin',
    resolveWithFullResponse: true,
    headers: {
      'User-Agent': params.ua.pc,
      'Cookie': cookie,
      'Referer': 'https://v2ex.com/signin',
    },
    formData,
  }).then(() => {
    res.json({
      success: false,
      msg: 'v2ex login 失败'
    });
  }).catch((err) => {
    let cookie = err.response.headers['set-cookie'][0];

    if (/^A2=/.test(cookie)) {
      cookie = cookie.replace('Domain=.v2ex.com; ', '').trim();

      res.append('Set-Cookie', cookie);
      res.json({
        success: true,
        data: {},
      });
    } else {
      res.json({
        success: false,
        msg: 'v2ex login 失败'
      });
    }
  });
};