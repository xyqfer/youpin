'use strict';

/**
 * 获取字幕内容
 */

module.exports = (req, res) => {
  require('isomorphic-fetch');
  const Dropbox = require('dropbox').Dropbox;
  var parser = require('subtitles-parser');

  const { name = '' } = req.query;

  let dropbox = new Dropbox({
    accessToken: process.env.dropboxToken,
  });

  dropbox.filesDownload({
    path: `/Subtitles/${name}.srt`,
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
      msg: `字幕 ${name} 获取失败`,
    });
  });
};