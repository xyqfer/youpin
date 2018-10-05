'use strict';

module.exports = (url) => {
  require('isomorphic-fetch');
  const Dropbox = require('dropbox').Dropbox;
  var parser = require('subtitles-parser');

  let dropbox = new Dropbox({
    accessToken: process.env.dropboxToken,
  });

  return dropbox.filesDownload({
    path: `/Subtitles/${url}.srt`,
  }).then((data) => {
    const srt = Buffer.from(data.fileBinary, 'binary').toString();
    const srtData = parser.fromSrt(srt);
    
    let content = srtData.map((item) => {
      let arr = item.text.split('\n').reverse();

      return {
        en: arr[0],
        zh: arr[1] || '',
      };
    });

    return { content };
  }).catch((err) => {
    console.log(err);
    return Promise.reject();
  });
};