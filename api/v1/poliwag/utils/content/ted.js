'use strict';

module.exports = (url) => {
  const http = require('../http');
  const { params } = require('app-libs');

  return http.get({
    uri: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    },
  }).then((htmlString) => {
    const id = htmlString.match(/__ga\('set', 'dimension2', (.+)\);/)[1];

    return http.get({
      uri: `https://www.ted.com/talks/${id}/transcript.json?language=en`,
      json: true,
      headers: {
        'User-Agent': params.ua.mobile,
      },
    }).then(res => {
      let data = {};
      data.content = res.paragraphs.reduce((content, item) => {
        item.cues.forEach(element => {
          content.push({
            en: element.text
          });
        });

        return content;
      }, []);

      return data;
    });
  }).catch((err) => {
    console.log(err);
    return Promise.reject();
  });
};