'use strict';

/**
 * 获取聊天详情
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');
  const convertContent = require('./utils/convertContent');

  const { id } = req.params;
  const { p = 1 } = req.query;

  let cookie = `A2=${req.cookies.A2 || ''}`;
  rp.get({
    json: true,
    uri: `https://www.v2ex.com/t/${id}?p=${p}`,
    headers: {
      'User-Agent': params.ua.pc,
      'Cookie': cookie,
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = {
      topic: {},
      reply: [],
      total: 1,
    };

    let $container = $('#Main > .box');
    let $header = $container.eq(0);
    let $body = $container.eq(1);

    data.topic = {
      title: $header.find('.header > h1').text(),
      author: $header.find('.gray > a').text(),
      avatar: `https:${$header.find('.avatar').attr('src')}`,
      createTime: $header.find('.gray').text().split('·')[1].trim(),
      click: $header.find('.gray').text().split('·')[2].trim(),
      node: {
        name: $header.find('.header > a').eq(1).text(),
        url: $header.find('.header > a').eq(1).attr('href'),
      },
      count: $body.find('.cell').eq(0).find('.gray').text().split('|')[0].trim(),
      content: convertContent($header.find('.topic_content').html() || '').content,
      tag: [],
    };

    let $additions = $header.find('.subtle');

    if ($additions.length > 0) {
      data.topic.additions = [];

      $additions.each(function () {
        let $addition = $(this);

        let addition = {
          content: convertContent($addition.find('.topic_content').html()).content,
          title: $addition.find('.fade').text().split('·')[0].trim(),
        };

        data.topic.additions.push(addition);
      });
    }

    $body.find('.cell').each(function () {
      let $item = $(this);
      let { at, content } = convertContent($item.find('.reply_content').html());

      if ($item.attr('id')) {
        let replyItem = {
          at,
          content,
          avatar: `https:${$item.find('.avatar').attr('src')}`,
          author: $item.find('.dark').text(),
          floor: $item.find('.no').text(),
        };

        let $thankItem = $item.find(".small.fade");
        if ($thankItem.length > 0) {
          replyItem.thank = $thankItem.text();
        }

        data.reply.push(replyItem);
      }
    });

    let $pageInput = $('.page_input');

    if ($pageInput.length > 0) {
      data.total = +$pageInput.attr('max');
    }

    let $tag = $('.tag');
    if ($tag.length > 0) {
      $tag.each(function () {
        let $item = $(this);

        data.topic.tag.push({
          url: $item.attr('href'),
          name: $item.text().trim(),
        });
      });
    }

    res.json({
      success: true,
      data
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `v2ex ${id} t 获取失败`
    });
  });
};