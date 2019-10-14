'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    try {
        const bookList = [];
        const addBook = (htmlString) => {
            const $ = cheerio.load(htmlString);

            $('.doulist-item').each(function(index, item) {
                const $item = $(item);
                const $link = $item.find('.title > a');
                const title = $link.text();
                const url = $link.attr('href');
                const cover = $item.find('.post img').attr('src');
                const detail = $item.find('.abstract').html();

                bookList.push({
                    title,
                    url,
                    cover,
                    detail,
                });
            });
        };

        let htmlString = await rp.get({
            uri: 'https://site.douban.com/commercialpress/room/827243/',
            headers: {
                'User-Agent': params.ua.pc,
            },
        });
        let $ = cheerio.load(htmlString);
        const totalBookUrl = $('.mod')
            .eq(0)
            .find('.hd h2 a')
            .attr('href');

        htmlString = await rp.get({
            uri: totalBookUrl,
            headers: {
                'User-Agent': params.ua.pc,
            },
        });
        addBook(htmlString);
        $ = cheerio.load(htmlString);
        const totalPage = +$('.thispage').attr('data-total-page');

        if (totalPage > 1) {
            const pages = Array.from({ length: totalPage - 1 }, (x, i) => i + 2);
            await Promise.all(
                pages.map(async (page) => {
                    const htmlString = await rp.get({
                        uri: `https://www.douban.com/doulist/109427472/?start=${25 * (page - 1)}&sort=seq&playable=0&sub_type=`,
                        headers: {
                            'User-Agent': params.ua.pc,
                        },
                    });
                    addBook(htmlString);
                    return Promise.resolve();
                })
            );
        }

        return bookList;
    } catch (err) {
        console.error(err);
        return [];
    }
};
