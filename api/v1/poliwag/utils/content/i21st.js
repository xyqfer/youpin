'use strict';

module.exports = (url) => {
  const http = require('../http');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  return http.get({
    uri: `http://m.i21st.cn${url}`,
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let content = [];

    $('#storyBody .story_en').each(function (index) {
      content.push({
        en: $(this).text(),
        zh: $('#storyBody .story_cn').eq(index).text(),
      });
    });

    return { content };
  }).catch((err) => {
    console.log(err);
    return Promise.reject();
  });
};