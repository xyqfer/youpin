'use strict';

/**
 * 湾区日报随机文章
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  rp.get({
    uri: 'https://wanqu.co/random/',
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let article = {
      title: $('.panel-heading > h1').text(),
      url: $('.panel-body a').attr('href'),
      summary: $('.lead').text(),
    };

    res.json({
      success: true,
      data: [article],
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'wanqu random 获取失败',
    });
  });
};