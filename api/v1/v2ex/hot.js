'use strict';

/**
 * 获取最热
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const url = require("url");
  const { params } = require('app-libs');

  rp.get({
    uri: 'https://www.v2ex.com/?tab=hot',
    headers: {
      'User-Agent': params.ua.pc
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('#Main > .box').eq(0).find('.cell.item').each(function () {
      let $elem = $(this);

      $elem.find('table').each(function () {
        let $table = $(this);

        let id = url.parse($table.find('.item_title > a').attr('href').replace(/^\/t\//, '')).path;

        let chatData = {
          id,
          avatar: `https:${$table.find('.avatar').attr('src')}`,
          title: $table.find('.item_title > a').text(),
          node: $table.find('.node').text(),
          reply: $table.find('.count_livid').text() || 0,
          time: $table.find('.topic_info').text().trim().split('•')[2]
        };

        data.push(chatData);
      });
    });

    res.json({
      success: true,
      data
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'v2ex hot 获取失败'
    });
  });
};