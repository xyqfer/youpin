'use strict';

/**
 * 获取 times 内容
 */

module.exports = (req, res) => {
  require('isomorphic-fetch');
  const Dropbox = require('dropbox').Dropbox;
  const cheerio = require('cheerio');

  const { name = '' } = req.query;

  let dropbox = new Dropbox({
    accessToken: process.env.dropboxToken,
  });

  dropbox.filesDownload({
    path: `/TIMES/${name}`,
  }).then((data) => {
    const $ = cheerio.load(Buffer.from(data.fileBinary, 'binary').toString(), {
      normalizeWhitespace: true,
      xmlMode: true
    });

    let content = [];

    $('p.calibre8').each(function() {
      let text = $(this).text();

      if (text !== '') {
        content.push({
          en: text,
        });
      }
    });

    res.json({
      success: true,
      data: {
        content,
      },
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `times ${name} content 获取失败`,
    });
  });
};