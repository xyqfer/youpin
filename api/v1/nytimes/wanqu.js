'use strict';

/**
 * 获取湾区日报内容
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  rp.get({
    uri: 'https://wanqu.co/',
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('.list-group-item').each(function() {
      let $elem = $(this);
      let title = $elem.find('.list-title').text();

      if (title !== '') {
        data.push({
          title,
          url: $elem.find('.row a').attr('href'),
          summary: $elem.find('.summary-text').text().replace(/阅读完整.*/g, ''),
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
      msg: 'wanqu 爬取失败',
    });
  });
};