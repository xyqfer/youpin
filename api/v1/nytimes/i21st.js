'use strict';

/**
 * 获取 i21st 新闻列表
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  const { p = 1 } = req.query;

  rp.get({
    uri: `http://m.i21st.cn/story/index_${p}.html`,
    headers: {
      'User-Agent': params.ua.mobile,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('.ui-li').each(function () {
      let $elem = $(this);
      let $link = $elem.find('.ui-li-heading');

      let title = $link.text();
      let url = $link.attr('href');

      let news = {
        title,
        url,
        summary: $elem.find('.ui-li-desc').text(),
      };

      data.push(news);
    });

    res.json({
      success: true,
      data,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `i21st ${p} 获取失败`,
    });
  });
};