'use strict';

module.exports = async () => {
  const Epub = require('epub-gen');
  const cheerio = require('cheerio');
  const {
    params,
    http,
  } = require('app-libs');

  const htmlString = await http.get({
    uri: 'https://www.newyorker.com/magazine',
    headers: {
      'User-Agent': params.ua.pc,
    },
  });

  const $ = cheerio.load(htmlString);
  const cover = $('.component-responsive-image').eq(0).find('source').eq(0).attr('srcset').split(',')[0].trim();
  const post = $('li[class^="River__riverItem"]').map(function() {
    const $item = $(this);
    const $link = $item.find('a').eq(1);
    const title = $link.text();
    const link = 'https://www.newyorker.com' + $link.attr('href');

    return {
      title,
      link,
    };
  }).get();
  const content = await Promise.mapSeries(post, async ({ title, link }) => {
    const htmlString = await http.get({
      uri: link,
      headers: {
        'User-Agent': params.ua.pc,
      },
    });
    const $ = cheerio.load(htmlString);
    const data = $('.SectionBreak > p').map(function() {
      return `<p>${$(this).text()}</p>`;
    }).get().join('');


    return {
      title,
      data,
    };
  });

  const option = {
    title: 'The New Yorker',
    author: 'liangliang',
    cover,
    content,
  };

  new Epub(option, './path.epub');
};