'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const {
        params
    } = require('app-libs');

    const htmlString = await rp.get({
        uri: 'http://kelemiao.cn/',
        headers: {
            'User-Agent': params.ua.pc
        }
    });

    const messages = [];
    const $ = cheerio.load(htmlString);

    $('.main_title').each(function () {
        const $item = $(this);
        const $link = $item.find('h2 a');
        const title = $link.text();

        messages.push({
            title,
            url: `http://kelemiao.cn${$link.attr('href')}`
        });
    });

    return messages;
};