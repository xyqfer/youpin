'use strict';

/**
 * 获取新闻内容
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  const { name = '' } = req.query;

  rp.get({
    uri: `https://www.nytimes.com${name}`,
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = {
      title: $('h1').eq(0).text(),
      content: [],
    };

    $('.StoryBodyCompanionColumn p').each(function() {
      data.content.push({
        en: $(this).text(),
      });
    });

    res.json({
      success: true,
      data,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `nytimes ${name} content 获取失败`,
    });
  });
};