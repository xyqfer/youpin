'use strict';

/**
 * 获取子类别新闻列表
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const { params } = require('app-libs');
  const parseList = require('./utils/parseList');

  const { name = '' } = req.params;
  const { p = 1 } = req.query;

  rp.get({
    uri: `https://m.cn.nytimes.com/viewmore/${name}/${p}/20`,
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    res.json({
      success: true,
      data: parseList(`<ol class="article-list">${htmlString}</ol>`),
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `nytimes ${name} category 获取失败`,
    });
  });
};