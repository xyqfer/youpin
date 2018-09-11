'use strict';

/**
 * 获取书评列表
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const { params } = require('app-libs');
  const parseNYTList = require('./utils/parseNYTList');

  rp.get({
    uri: 'https://www.nytimes.com/section/books',
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((htmlString) => {
    res.json({
      success: true,
      data: parseNYTList(htmlString),
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'nytimes book 获取失败',
    });
  });
};