'use strict';

/**
 * 解析新闻列表
 */

module.exports = (htmlString) => {
    const cheerio = require('cheerio');

    const $ = cheerio.load(htmlString);
    const data = [];

    $('.article-list > li').each(function() {
        const $elem = $(this);
        const elemClass = $(this).attr('class');

        if (elemClass && !elemClass.includes('photospot-slideshow-item')) {
            const $link = $elem.find('a');
            let title = $link.attr('title');

            if (!title) {
                title = $link
                    .find('h2')
                    .text()
                    .trim();
            }

            const news = {
                title,
                url: $link.attr('href').replace('https://cn.nytimes.com', ''),
                summary: $elem.find('.summary-container').text(),
            };

            data.push(news);
        }
    });

    return data;
};
