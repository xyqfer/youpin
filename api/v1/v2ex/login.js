'use strict';

/**
 * 登录
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  const { cookie, form, once } = req.body;
  let formData = {
    once,
    next: '/',
  };
  form.forEach((value, key) => {
    formData[key] = value;
  });

  rp.post({
    uri: 'https://www.v2ex.com/signin',
    headers: {
      'User-Agent': params.ua.pc,
      'Cookie': cookie,
    },
    formData,
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);

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