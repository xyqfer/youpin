'use strict';

/**
 * 解析新闻内容
 */

module.exports = (htmlString) => {
    const cheerio = require('cheerio');

    const $ = cheerio.load(htmlString);
    const data = {
        title: $('.article-header h1')
            .eq(0)
            .text(),
        content: [],
    };

    $('.article-dual-body-item').each(function() {
        const $p = $(this).find('.article-paragraph');
        const enText = $p.eq(0).text();
        const zhText = $p.eq(1).text();

        if (enText !== '' && zhText !== '') {
            data.content.push({
                en: enText,
                zh: zhText,
            });
        }
    });

    return data;
};
