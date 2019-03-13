'use strict';

module.exports = async (req, res) => {
  const { page = 1, id = 0 } = req.query;
  const {
    params,
    http,
  } = require('app-libs');
  const cheerio = require('cheerio');
  let data = {};
  let success = true;
  const url = `https://www.nfcmag.com/category/${id}/page/${page}.html`;

  try {
    const htmlString = await http.get({
      uri: url,
      headers: {
        'User-Agent': params.ua.pc,
      },
    });
    const $ = cheerio.load(htmlString);
    const name = $('.category-header a').attr('title');
    const article = $('.article-items').map(function () {
      const $elem = $(this);
      const $link = $elem.find('h5 > a');
      const title = $link.attr('title');
      const url = 'https://www.nfcmag.com' + $link.attr('href');
      const summary = $elem.find('p').text();
      return {
        title,
        url,
        summary,
      };
    }).get();

    data = {
      url,
      name,
      article,
    };
  } catch (err) {
    console.error(err);
    data = {};
    success = false;
  }

  res.json({
    success,
    data,
  });
};