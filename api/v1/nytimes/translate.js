'use strict';

/**
 * 翻译
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const { params } = require('app-libs');

  const { text = '' } = req.body;

  rp.post({
    json: true,
    uri: 'https://translate.google.cn/translate_a/single',
    form: {
      dt: 't',
      tl: 'zh-CN',
      ie: 'UTF-8',
      sl: 'auto',
      client: 'ia',
      dj: '1',
      q: text,
    },
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((response) => {
    res.json({
      success: true,
      data: response.sentences,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'google translate 失败',
    });
  });
};