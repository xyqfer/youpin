'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const {
        params
    } = require('app-libs');

    const htmlString = await rp.get({
        uri: 'https://www.cbnweek.com/',
        headers: {
            'User-Agent': params.ua.pc
        }
    });

    const magazines = [];
    const $ = cheerio.load(htmlString);

    $('.new-magazine').each(function () {
        const $item = $(this);

        magazines.push({
            img: $item.find('.magazine-cover > img').attr('src'),
            title: $item.find('.aside-title-magazine').text(),
            no: $item.find('.text-muted').eq(0).text(),
            time: $item.find('.text-muted').eq(1).text(),
            url: `https://www.cbnweek.com${$item.attr('href')}`
        });
    });

    return magazines;
};