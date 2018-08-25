'use strict';

/**
 * 获取 TE 列表
 */

module.exports = (req, res) => {
  require('isomorphic-fetch');
  const Dropbox = require('dropbox').Dropbox;
  const cheerio = require('cheerio');

  let dropbox = new Dropbox({
    accessToken: process.env.dropboxToken,
  });

  dropbox.filesDownload({
    path: `/TE2/nav.xhtml`,
  }).then((data) => {
    const $ = cheerio.load(Buffer.from(data.fileBinary, 'binary').toString(), {
      normalizeWhitespace: true,
      xmlMode: true
    });

    let articles = [];
    let category = '';

    $('nav').eq(0).find('a').each(function() {
      let $link = $(this);
      
      if ($link.attr('href').includes('article_')) {
        articles.push({
          category,
          title: $link.text(),
          name: $link.attr('href'),
        });
      } else {
        category = $link.text();
      }
    });

    res.json({
      success: true,
      data: articles,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'TE 列表获取失败',
    });
  });
};