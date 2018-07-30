'use strict';

/**
 * 获取新闻内容
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const { params } = require('app-libs');
  const parseContent = require('./utils/parseContent');

  const { name = '' } = req.query;

  rp.get({
    uri: `https://cn.nytimes.com${name}dual/`,
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    res.json({
      success: true,
      data: parseContent(htmlString),
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `nytimes ${name} content 获取失败`,
    });
  });
};