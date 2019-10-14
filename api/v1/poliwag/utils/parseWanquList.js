'use strict';

/**
 * 解析湾区日报列表
 */

module.exports = (htmlString) => {
    const cheerio = require('cheerio');

    const $ = cheerio.load(htmlString);
    const data = [];

    $('.list-group-item').each(function() {
        const $elem = $(this);
        const title = $elem.find('.list-title').text();

        if (title !== '') {
            data.push({
                title,
                url: $elem.find('.row a').attr('href'),
                summary: $elem
                    .find('.summary-text')
                    .text()
                    .replace(/阅读完整.*/g, ''),
            });
        }
    });

    return data;
};
