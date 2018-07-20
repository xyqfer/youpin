'use strict';

/**
 * 内容转换处理
 */

module.exports = (content) => {
  const cheerio = require('cheerio');
  const url = require("url");
  const id = 'vsrokjx';
  let at = [];

  let $ = cheerio.load(`<div id="${id}">${content}</div>`);
  $('a').each(function () {
    let $elem = $(this);
    let link = $elem.attr('href') || '';

    if (link === '') {
      return;
    }

    const reg = /^https:\/\/www\.v2ex\.com/;
    link = url.resolve('https://www.v2ex.com', link);

    if (!(reg).test(link)) {
      $elem.addClass('external').attr('target', '_blank');
    } else {
      $elem.attr('href', link.replace(reg, ''));
    }

    if ((/^\/member\/.+/).test($elem.attr('href'))) {
      at.push($elem.text());
    }
  });

  return {
    at,
    content: $(`#${id}`).html(),
  };
};