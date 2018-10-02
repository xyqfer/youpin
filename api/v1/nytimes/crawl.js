'use strict';

/**
 * 爬取内容
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  const { name = '' } = req.query;

  rp.get({
    uri: name,
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = {
      title: $('title').text(),
      content: [],
    };

    $('p').each(function() {
      let text = $(this).text();

      if (text !== '') {
        data.content.push({
          en: text,
        });
      }
    });

    res.json({
      success: true,
      data,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `${name} 爬取失败`,
    });
  });
};