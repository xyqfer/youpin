'use strict';

/**
 * 搜索帖子
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  const { q = '', p = 1 } = req.query;

  rp.get({
    uri: `https://www.google.com/search?q=site:v2ex.com/t%20${q}&start=${10 * (p - 1)}`,
    headers: {
      'User-Agent': params.ua.mobile,
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('#rso > .srg .amp_r').each(function () {
      let $elem = $(this);
      let post = {
        title: $elem.find("[role='heading']").text().replace(/ \- V2EX$/, '').trim(),
      };

      data.push(post);
    });

    res.json({
      success: true,
      data
    });
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      msg: `v2ex ${q} search 失败`
    });
  });
};