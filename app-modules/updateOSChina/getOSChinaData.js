'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    const htmlString = await rp.get({
        uri: 'https://my.oschina.net/xxiaobian/widgets/_space_index_newest_blog?catalogId=547834&q=&p=1&type=ajax',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });

    const messages = [];
    const $ = cheerio.load(htmlString);

    $('.blog-item').each(function() {
        const $item = $(this);
        const $link = $item.find('.header');
        const title = $link.text();

        messages.push({
            title,
            url: $link.attr('href'),
        });
    });

    return messages;
};
