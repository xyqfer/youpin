'use strict';

const {
    params,
    http,
    db,
} = require('app-libs');
const cheerio = require('cheerio');
const flatten = require('lodash/flatten');

module.exports = async (req, res) => {
  res.json({
    success: true,
  });

  return;

  const maxPage = 4;
  let pageList = [];

  for (let i = 2; i <= maxPage; i++) {
      pageList.push(i);
  }

  let pageUrlList =  await Promise.mapSeries(pageList, async (page) => {
    const htmlString = await http.get({
      uri: `http://www.ningmeng.name/archives/category/%E7%A7%81%E6%88%BF%E6%AD%8C/page/${page}`,
      headers: {
        'User-Agent': params.ua.pc,
      },
    });
    const $ = cheerio.load(htmlString);

    return $('article').map(function() {
      const $elem = $(this);
      if ($elem.find('.post').hasClass('cover')) {
        return $elem.find('.u-permalink').attr('href');
      } else {
        return null;
      }
    }).get().filter(url => !!url);
  });
  pageUrlList = flatten(pageUrlList);

  console.log(pageUrlList)
  console.log('finished pageUrlList')

  let data = await Promise.mapSeries(pageUrlList, async (url) => {
    console.log(url);

    let data = [];
    const htmlString = await http.get({
      uri: url,
      headers: {
        'User-Agent': params.ua.pc,
      },
    });
    const $ = cheerio.load(htmlString);
    const $content = $('.entry-content');
    $content.find('img').each(function() {
      const cover = $(this).attr('src').replace(/\?.+/, '');
      data.push({
        cover,
      });
    });

    $content.find('.karma-by-kadar__simple-player').each(function(i) {
      const url = $(this).attr('data-src');
      data[i].url = url;
    });

    $content.text().trim()
      .split('\n\n').slice(0, -1)
      .map(content => content.split('\n').slice(0, 2))
      .forEach((content, i) => {
        if (data[i]) {
          const songInfo = content[0];
          const split = songInfo.includes('--') ? '--' : '-';
          const [ name, author ] = content[0].split(split);

          data[i].name = name;
          data[i].author = author;
          data[i].desc = content[1];
        }
      });

    return data;
  });

  data = flatten(data);

  console.log(data);

  const result = await db.saveDbData({
    dbName: 'Music',
    data,
  });

  console.log(result)
};