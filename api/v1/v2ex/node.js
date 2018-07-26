'use strict';

/**
 * 获取节点信息
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const url = require("url");
  const { params } = require('app-libs');

  const { name } = req.params;
  const { p = 1 } = req.query;

  let cookie = req.cookie || '';
  rp.get({
    uri: `https://www.v2ex.com/go/${name}?p=${p}`,
    headers: {
      'User-Agent': params.ua.pc,
      'Cookie': cookie,
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = {
      total: 1,
      node: {
        count: +$('.node_info > .fr.f12 > strong').text(),
        name: $('head > title').text().split('›')[1].trim(),
      },
      list: [],
    };

    $('#TopicsNode > .cell').each(function () {
      let $elem = $(this);

      $elem.find('table').each(function () {
        let $table = $(this);

        let id = url.parse($table.find('.item_title > a').attr('href').replace(/^\/t\//, '')).path;

        let chatData = {
          id,
          avatar: `https:${$table.find('.avatar').attr('src')}`,
          title: $table.find('.item_title > a').text(),
          reply: $table.find('.count_livid').text() || 0,
          time: ($table.find('.small.fade').text().split('•')[1] || '').trim(),
        };

        data.list.push(chatData);
      });
    });

    let $pageInput = $('.page_input');

    if ($pageInput.length > 0) {
      data.total = +$pageInput.attr('max');
    }

    res.json({
      success: true,
      data
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `v2ex ${name} node 获取失败`
    });
  });
};