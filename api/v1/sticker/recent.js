'use strict';

module.exports = (req, res) => {
  const http = require('./utils/http');
  const parser = require('./utils/parseSnippet');
  const { params } = require('app-libs');

  http.get({
    uri: 'https://tlgrm.eu/stickers',
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((htmlString) => {
    res.json({
      success: true,
      data: parser({
        htmlString,
        type: 'recent'
      }),
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'sticker recent 获取失败',
    });
  });
};