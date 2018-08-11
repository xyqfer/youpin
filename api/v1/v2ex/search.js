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
    uri: `https://wecodexyz.avosapps.us/?q=site%3Av2ex.com%20${encodeURIComponent(q)}&categories=general&pageno=${p}&time_range=None`,
    headers: {
      'User-Agent': params.ua.pc,
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('#main_results > .result').each(function () {
      let $elem = $(this);
      let $link = $elem.find('.result_header > a');

      let post = {
        title: $link.text().replace(/\- V2EX$/, '').trim(),
        url: $link.attr('href').replace(/^https:\/\/www\.v2ex\.com/, ''),
        desc: $elem.find('.result-content').text().trim(),
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