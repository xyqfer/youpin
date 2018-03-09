'use strict';

module.exports = () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-lib');

    return rp.get({
        uri: 'https://book.douban.com/latest?icn=index-latestbook-all',
        headers: {
            'User-Agent': params.ua.pc
        }
    }).then((htmlString) => {
        const $ = cheerio.load(htmlString);
        const bookList = [];

        $('#content ul > li').each(function () {
            const $book = $(this);

            bookList.push({
                url: $book.find('.cover').attr('href'),
                cover: $book.find('.cover > img').attr('src'),
                name: $book.find('.detail-frame > h2').text().replace(/\n+/g, '').trim(),
                desc: $book.find('.detail').text().replace(/\n+/g, '').trim(),
                pubInfo: $book.find('.color-gray').text().replace(/\n+/g, '').trim()
            });
        });

        return bookList;
    }).catch((err) => {
        console.error(err);
        return [];
    });
};
