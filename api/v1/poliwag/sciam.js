'use strict';

module.exports = (req, res) => {
  const http = require('./utils/http');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');
  const { p = 1 } = req.query;

  http.post({
    uri: `https://www.scientificamerican.com/behavior-and-society/?page=${p}`,
    headers: {
      'User-Agent': params.ua.mobile,
    },
    form: {
      source: 'article'
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('article').each(function () {
      let $elem = $(this);
      let $link = $elem.find('.t_listing-title > a');

      let title = $link.text();
      let url = $link.attr('href').replace('https://www.scientificamerican.com/article', '');

      let article = {
        title,
        url,
        img: $elem.find('.listing-wide__thumb img').attr('src').replace(/\?.+$/g, ''),
        summary: $elem.find('.t_meta').text(),
      };

      data.push(article);
    });

    res.json({
      success: true,
      data,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'sciam 获取失败',
    });
  });
};