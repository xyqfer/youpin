'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const {
        params
    } = require('app-libs');

    const htmlString = await rp.get({
        uri: 'http://beiwoo.cn/m/list.php?tid=41',
        headers: {
            'User-Agent': params.ua.pc
        }
    });

    const messages = [];
    const $ = cheerio.load(htmlString);

    $('.main_m_title').each(function () {
        const $item = $(this);
        const $link = $item.find('a');
        const title = $item.find('h2').text();

        messages.push({
            title,
            url: `http://beiwoo.cn/m/${$link.attr('href')}`
        });
    });

    return messages.slice(0, 3);
};