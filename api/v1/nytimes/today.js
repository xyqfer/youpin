'use strict';

/**
 * 获取今日新闻列表
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  rp.get({
    uri: 'https://www.nytimes.com/section/todayspaper',
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('.theme-summary').add($('.story-items')).each(function() {
      let $elem = $(this);
      let $link = $(this).find('.headline > a');

      if ($link.length > 0) {
        let news = {
          title: $link.text(),
          url: $link.attr('href').replace('https://www.nytimes.com', ''),
          summary: $elem.find('.summary').text(),
        };
        data.push(news);
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
      msg: 'nytimes today 获取失败',
    });
  });
};