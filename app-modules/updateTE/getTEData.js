'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const {
        params,
        http,
    } = require('app-libs');

    const host = 'https://www.economist.com';
    const htmlString = await http.get({
        uri: host + '/printedition/2',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });
    const $ = cheerio.load(htmlString);
    const result = $('.print-edition__content ul.list > li.list__item').filter(function () {
        return $(this).find('.list__title').text().trim().toLowerCase() === 'china';
    }).map(function () {
        const $elem = $(this);
        return $elem.find('.list__link').map(function () {
            const $link = $(this);
            let title = $link.find('.print-edition__link-title').text();

            if (title === '') {
                title = $link.find('.print-edition__link-title-sub').text();
            }

            const link = $link.attr('href');
            const url = `https://ibdkopi6vn.avosapps.us/poliwag#!/content?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}&region=te`;
            const summary = $link.find('.print-edition__link-flytitle').text();
            return {
                title,
                url,
                summary,
            };
        }).get();
    }).get();

    return result;
};