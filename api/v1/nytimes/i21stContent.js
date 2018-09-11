'use strict';

/**
 * 获取 i21st 新闻内容
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  const { name = '' } = req.query;

  rp.get({
    uri: `http://m.i21st.cn${name}`,
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let content = [];

    $('#storyBody .story_en').each(function (index) {
      content.push({
        en: $(this).text(),
        zh: $('#storyBody .story_cn').eq(index).text(),
      });
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
      msg: `i21st ${name} 获取失败`,
    });
  });
};