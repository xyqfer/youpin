'use strict';

module.exports = async (req, res) => {
  const { url } = req.query;
  const {
    params,
    http,
  } = require('app-libs');
  const cheerio = require('cheerio');
  let data = {};
  let success = true;

  try {
    const htmlString = await http.get({
      uri: url,
      headers: {
        'User-Agent': params.ua.pc,
      },
    });
    const $ = cheerio.load(htmlString);
    const $article = $('.article-content-box');
    const title = $article.find('.subject').text();
    const content = $article.find('.content > div').map(function () {
      const $elem = $(this);
      $elem.find('*').each(function() {
        $(this).removeAttr('style');
      });
      return `<p>${$elem.html()}</p>`
    }).get().join('');

    data = {
      url,
      title,
      content,
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