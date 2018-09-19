'use strict';

/**
 * 翻译
 */

module.exports = (req, res) => {
  const googletranslate = require('./utils/googletranslate');
  const { text = '' } = req.body;
  
  googletranslate(text).then((response) => {
    let text = response.sentences.reduce((acc, item) => {
      return acc + item.trans;
    }, '');

    res.json({
      success: true,
      data: {
        text,
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