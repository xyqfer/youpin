'use strict';

/**
 * 解析 nyt 列表
 */

module.exports = (htmlString) => {
  const cheerio = require('cheerio');

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

  return data;
};