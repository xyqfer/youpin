'use strict';

/**
 * 获取 tab
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const { params } = require('app-libs');
  const parsePage = require('./utils/parseHomePage');

  const { name } = req.params;

  rp.get({
    uri: `https://www.v2ex.com/?tab=${name}`,
    headers: {
      'User-Agent': params.ua.pc
    }
  }).then((htmlString) => {
    res.json({
      success: true,
      data: parsePage(htmlString),
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'v2ex ${name} tab 获取失败'
    });
  });
};