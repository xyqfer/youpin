'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const iconv = require('iconv-lite');
    const {
        params
    } = require('app-libs');

    const htmlString = await rp.get({
        uri: 'http://www.gzwatersupply.com/stop/stopgl.html2?tab=9',
        encoding : null,
        headers: {
            'User-Agent': params.ua.pc
        }
    });

    const messages = [];
    const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));

    $('table').eq(37).find('tr').each(function () {
        const $item = $(this);
        const $link = $item.find('.new2');

        if ($link.length > 0) {
            messages.push({
                title: $item.text(),
                url: `http://www.gzwatersupply.com/stop/${$link.attr('href')}`
            });
        }
    });

    return messages;
};