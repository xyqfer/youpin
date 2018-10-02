'use strict';

/**
 * 获取 TE 列表
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  rp.get({
    uri: 'https://www.economist.com/ap/printedition/',
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = {
      cover: {
        img: $('img.component-image__img').attr('src'),
        time: $('.print-edition__main-title-header__date').text(),
        topic: $('.print-edition__main-title-header__edition').text()
      },
      list: []
    };

    $('.print-edition__content ul.list > li.list__item').each(function() {
      let $elem = $(this);

      let group = {
        title: $elem.find('.list__title').text(),
        list: [],
      };

      $elem.find('.list__link').each(function() {
        let $link = $(this);
        let title = $link.find('.print-edition__link-title').text();

        if (title === '') {
          title = $link.find('.print-edition__link-title-sub').text();
        }

        group.list.push({
          url: $link.attr('href'),
          title,
          flyTitle: $link.find('.print-edition__link-flytitle').text(),
        });
      });

      data.list.push(group);
    });

    res.json({
      success: true,
      data,
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'te2 获取失败',
    });
  });
};