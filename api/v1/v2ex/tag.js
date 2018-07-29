'use strict';

/**
 * 获取标签页
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const url = require("url");
  const { params } = require('app-libs');

  const { name } = req.params;

  let cookie = `A2=${req.cookies.A2 || ''}`;
  rp.get({
    uri: `https://www.v2ex.com/tag/${encodeURIComponent(name)}`,
    headers: {
      'User-Agent': params.ua.pc,
      'Cookie': cookie,
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let $container = $('#Main > .box');

    let data = {
      count: +$container.find('.header .fade').text().replace(/[^0-9]+/g, ''),
      list: [],
    };

    $container.find('.cell.item').each(function () {
      let $elem = $(this);

      $elem.find('table').each(function () {
        let $table = $(this);

        let id = url.parse($table.find('.item_title > a').attr('href').replace(/^\/t\//, '')).path;

        let chatData = {
          id,
          avatar: `https:${$table.find('.avatar').attr('src')}`,
          title: $table.find('.item_title > a').text(),
          reply: $table.find('.count_livid').text() || 0,
          time: ($table.find('.topic_info').text().split('•')[2] || '').trim(),
          node: $table.find('.node').text(),
        };

        data.list.push(chatData);
      });
    });

    res.json({
      success: true,
      data,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `v2ex ${name} tag 获取失败`,
    });
  });
};