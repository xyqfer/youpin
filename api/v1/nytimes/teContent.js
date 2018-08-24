'use strict';

/**
 * 获取 TE 内容
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
    path: `/TE/${name}/article.xml`,
  }).then((data) => {
    const $ = cheerio.load(Buffer.from(data.fileBinary, 'binary').toString(), {
      normalizeWhitespace: true,
      xmlMode: true
    });

    let content = [];

    $('content > *').each(function () {
      const $elem = $(this);

      content.push({
        en: $elem.find('copy[lang=en_GB]').text(),
        zh: $elem.find('copy[lang=zh_CN]').text(),
      });
    });

    res.json({
      success: true,
      data: content,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `te ${name} content 获取失败`,
    });
  });
};