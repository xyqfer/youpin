'use strict';

module.exports = (url) => {
  require('isomorphic-fetch');
  const Dropbox = require('dropbox').Dropbox;
  const cheerio = require('cheerio');

  const dropbox = new Dropbox({
    accessToken: process.env.dropboxToken,
  });

  return dropbox.filesDownload({
    path: `/TIMES/${url}`,
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

    return { content };
  }).catch((err) => {
    console.log(err);
    return Promise.reject();
  });
};