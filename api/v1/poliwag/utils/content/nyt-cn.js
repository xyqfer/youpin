'use strict';

module.exports = (url) => {
  const http = require('../http');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  const parseContent = (htmlString) => {
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

  return http.get({
    uri: `https://cn.nytimes.com${url}dual/`,
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    return parseContent(htmlString);
  }).catch((err) => {
    console.log(err);
    return Promise.reject();
  });
};
