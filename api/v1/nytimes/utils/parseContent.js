'use strict';

/**
 * 解析新闻内容
 */

module.exports = (htmlString) => {
  const cheerio = require('cheerio');

  let $ = cheerio.load(htmlString);
  let data = {
    title: $('.article-header h1').eq(0).text(),
    content: [],
  };

  $('.article-dual-body-item').each(function () {
    let $p = $(this).find('.article-paragraph');

    let block = {
      en: $p.eq(0).text(),
      zh: $p.eq(1).text(),
    };

    data.content.push(block);
  });

  return data;
};