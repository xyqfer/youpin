'use strict';

/**
 * 获取首页新闻列表
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const { params } = require('app-libs');
  const parseList = require('./utils/parseList');

  rp.get({
    uri: 'https://m.cn.nytimes.com/',
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    res.json({
      success: true,
      data: parseList(htmlString),
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'nytimes home 获取失败',
    });
  });
};