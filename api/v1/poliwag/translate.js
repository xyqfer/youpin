'use strict';

module.exports = (req, res) => {
  const googletranslate = require('./utils/googletranslate');
  const { text = '', type = 'all' } = req.body;

  googletranslate(text).then((response) => {
    let data = {};

    if (type === 'all') {
      let text = response.sentences.reduce((acc, item) => {
        return acc + item.trans;
      }, '');

      data.text = text;
    } else {
      let content = response.sentences.map((item) => {
        return {
          en: item.orig,
          zh: item.trans,
        };
      }, '');

      data.content = content;
    }

    res.json({
      success: true,
      data,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'translate 失败',
    });
  });
};