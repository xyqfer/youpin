'use strict';

/**
 * 湾区日报近期热门文章
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const { params } = require('app-libs');
  const parseWanquList = require('./utils/parseWanquList');

  rp.get({
    uri: 'https://wanqu.co/hot/',
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((htmlString) => {
    res.json({
      success: true,
      data: parseWanquList(htmlString),
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'wanqu hot 获取失败',
    });
  });
};