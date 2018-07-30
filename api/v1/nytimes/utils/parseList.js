'use strict';

/**
 * 解析新闻列表
 */

module.exports = (htmlString) => {
  const cheerio = require('cheerio');

  let $ = cheerio.load(htmlString);
  let data = [];

  $('.article-list > li').each(function () {
    let $elem = $(this);
    let elemClass = $(this).attr('class');

    if (elemClass && !elemClass.includes('photospot-slideshow-item')) {
      let $link = $elem.find('a');

      let news = {
        title: $link.attr('title'),
        url: $link.attr('href').replace('https://cn.nytimes.com', ''),
        summary: $elem.find('.summary-container').text(),
      };

      data.push(news);
    }
  });

  return data;
};