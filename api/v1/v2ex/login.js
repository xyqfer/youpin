'use strict';

/**
 * 登录
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
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
    followAllRedirects: true,
    resolveWithFullResponse: true,
    headers: {
      'User-Agent': params.ua.pc,
      'Cookie': cookie,
    },
    formData,
  }).then((response) => {
    let $ = cheerio.load(response.body);
    console.log(response.headers);

    if ($('.sl').length > 0) {
      res.json({
        success: false,
        msg: 'v2ex login 失败'
      });
    } else {
      res.json({
        success: true,
        data: {},
      });
    }
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'v2ex login 失败'
    });
  });
};