'use strict';

/**
 * 湾区日报往期文章
 */

module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');
  const parseWanquList = require('./utils/parseWanquList');

  const { id = 0 } = req.query;

  rp.get({
    uri: `https://wanqu.co/issues/${id === 0 ? '' : id}`,
    headers: {
      'User-Agent': params.ua.pc,
    },
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);

    if (id === 0) {
      let id = $('.panel-heading a').attr('href').replace(/\D+/g, '');

      rp.get({
        uri: `https://wanqu.co/issues/${id}`,
        headers: {
          'User-Agent': params.ua.pc,
        },
      }).then((htmlString) => {
        res.json({
          success: true,
          data: {
            id,
            content: parseWanquList(htmlString),
          },
        });
      }).catch((err) => {
        console.log(err);
        res.json({
          success: false,
          msg: 'wanqu random 获取失败',
        });
      });
    } else {
      res.json({
        success: true,
        data: {
          id,
          content: parseWanquList(htmlString),
        },
      });
    }
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: 'wanqu random 获取失败',
    });
  });
};