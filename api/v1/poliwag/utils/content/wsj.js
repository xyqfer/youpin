'use strict';

module.exports = (url) => {
  const http = require('../http');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  return http.get({
    uri: url,
    headers: {
      'User-Agent': params.ua.mobile,
      'Cookie': `djcs_auto=${process.env.wsj_auto}; djcs_session=${process.env.wsj_session}`,
      'Referer': 'https://www.wsj.com'
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = {
      title: $('h1').eq(0).text(),
      content: [],
    };

    $('.article-content p').each(function() {
      let text = $(this).text();

      if (text !== '') {
        data.content.push({
          en: $(this).text(),
        });
      }
    });

    return data;
  }).catch((err) => {
    console.log(err);
    return Promise.reject();
  });
};