'use strict';

module.exports = (req, res) => {
  const http = require('./utils/http');
  const { params } = require('app-libs');
  const parseNYTList = require('./utils/parseNYTList');

  http.get({
    uri: 'https://www.nytimes.com/section/todayspaper',
    headers: {
      'User-Agent': params.ua.mobile,
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
      msg: 'nyt-today 获取失败',
    });
  });
};