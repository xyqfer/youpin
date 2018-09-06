'use strict';

/**
 * 获取湾区日报内容
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const { params } = require('app-libs');
  const parseWanquList = require('./utils/parseWanquList');

  rp.get({
    uri: 'https://wanqu.co/',
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
      msg: 'wanqu 爬取失败',
    });
  });
};