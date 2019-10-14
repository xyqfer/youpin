'use strict';

/**
 * 解析 nyt 列表
 */

module.exports = (htmlString) => {
    const cheerio = require('cheerio');

    const $ = cheerio.load(htmlString);
    const data = [];

    $('.theme-summary')
        .add($('.story-items'))
        .each(function() {
            const $elem = $(this);
            const $link = $(this).find('.headline > a');

            if ($link.length > 0) {
                const news = {
                    title: $link.text(),
                    url: $link.attr('href').replace('https://www.nytimes.com', ''),
                    summary: $elem.find('.summary').text(),
                };
                data.push(news);
            }
        });

    return data;
};
