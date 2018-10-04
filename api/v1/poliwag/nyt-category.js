'use strict';

module.exports = (req, res) => {
  const http = require('./utils/http');
  const { params } = require('app-libs');
  const parseList = require('./utils/parseList');

  const { p = 1, name = '' } = req.query;

  http.get({
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
      msg: `nyt-category ${name} 获取失败`,
    });
  });
};