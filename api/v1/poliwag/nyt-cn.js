'use strict';

module.exports = (req, res) => {
  const http = require('./utils/http');
  const { params } = require('app-libs');
  const parseList = require('./utils/parseList');

  http.get({
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
      msg: 'nyt-cn 获取失败',
    });
  });
};