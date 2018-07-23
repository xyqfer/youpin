'use strict';

/**
 * 搜索帖子
 */
module.exports = (req, res) => {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const { params } = require('app-libs');

  const { q = '', p = 1 } = req.query;
  console.log(q);

  rp.get({
    uri: `https://www.google.com/search?q=site:v2ex.com/t%20${encodeURIComponent(q)}&start=${10 * (p - 1)}`,
    headers: {
      'User-Agent': params.ua.mobile,
    }
  }).then((htmlString) => {
    let $ = cheerio.load(htmlString);
    let data = [];

    $('#rso > .srg > div').each(function () {
      let $elem = $(this);
      let $link = $elem.find('.amp_r');
      let post = {
        title: $link.find("[role='heading']").text().replace(/\- V2EX$/, '').trim(),
        url: $link.attr('data-amp-cur').replace(/^https:\/\/www\.v2ex\.com/, ''),
        desc: $elem.find("div[data-id^='_'] > div").eq(1).text().trim(),
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