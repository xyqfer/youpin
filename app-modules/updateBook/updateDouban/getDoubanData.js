'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-libs');
    const bookList = [];

    try {
        // 新书页
        let htmlString = await rp.get({
            uri: 'https://book.douban.com/latest?icn=index-latestbook-all',
            headers: {
                'User-Agent': params.ua.pc
            }
        });
        let $ = cheerio.load(htmlString);

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
    } catch (err) {
        console.error(err);
    }

    try {
        //读书首页
        const htmlString = await rp.get({
            uri: 'https://book.douban.com/',
            headers: {
                'User-Agent': params.ua.pc
            }
        });
        const $ = cheerio.load(htmlString);

        $('.carousel .slide-list li').each(function () {
            const $book = $(this);
            const pubInfo = $book.find('.more-meta .author').text().replace(/\n+/g, '').trim() + ' / ' +
                $book.find('.more-meta .publisher').text().replace(/\n+/g, '').trim() + ' / ' +
                $book.find('.more-meta .year').text().replace(/\n+/g, '').trim();

            bookList.push({
                url: $book.find('.cover a').attr('href').replace(/\?.+$/g, ''),
                cover: $book.find('.cover img').attr('src'),
                name: $book.find('.info .more-meta .title').text().replace(/\n+/g, '').trim(),
                desc: $book.find('.abstract').text().replace(/\n+/g, '').trim(),
                pubInfo
            });
        });
    } catch (err) {
        console.error(err);
    }

    return uniqBy(bookList, 'url');
};
