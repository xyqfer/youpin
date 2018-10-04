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
    let enText = $p.eq(0).text();
    let zhText = $p.eq(1).text();

    if (enText !== '' && zhText !== '') {
      data.content.push({
        en: enText,
        zh: zhText,
      });
    }
  });

  return data;
};