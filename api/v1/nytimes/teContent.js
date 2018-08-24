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

      let enText = $elem.find('copy[lang=en_GB]').text();
      let zhText = $elem.find('copy[lang=zh_CN]').text();

      if (enText !== '' && zhText !== '') {
        content.push({
          en: enText,
          zh: zhText,
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
      msg: `te ${name} content 获取失败`,
    });
  });
};