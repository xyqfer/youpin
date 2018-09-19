'use strict';

/**
 * 翻译
 */

module.exports = (req, res) => {
  const googletranslate = require('./utils/googletranslate');
  const { text = '' } = req.body;
  
  googletranslate(text).then((response) => {
    let content = response.sentences.map((item) => {
      return {
        en: item.orig,
        zh: item.trans,
      };
    }, '');

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
      msg: 'translate 失败',
    });
  });
};