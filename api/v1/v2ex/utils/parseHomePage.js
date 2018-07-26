'use strict';

/**
 * 获取类首页数据
 */

module.exports = (htmlString) => {
  const cheerio = require('cheerio');
  const url = require("url");

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
        time: ($table.find('.topic_info').text().trim().split('•')[2] || '').trim(),
      };

      if ($elem.attr('style').indexOf('/static/img/corner_star.png') !== -1) {
        chatData.top = true;
      }

      data.push(chatData);
    });
  });

  return data;
};