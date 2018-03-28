'use strict';

module.exports = async ({
    offsets = [0]
}) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const { params } = require('app-libs');

    const hostPrefix = 'http://www.broadview.com.cn';

    try {
        const results = await Promise.mapSeries(offsets, async (page) => {
            try {
                const htmlString = await rp.get({
                    uri: `http://www.broadview.com.cn/book?tab=book&sort=new&page=${page}`,
                    headers: {
                        'User-Agent': params.ua.pc
                    }
                });

                const $ = cheerio.load(htmlString);
                const newBookList = [];

                $('.block-item').each(function () {
                    newBookList.push({
                        title: $(this).find('.book-img img').attr('alt'),
                        url: hostPrefix + $(this).find('.book-img a').attr('href'),
                        cover: $(this).find('.book-img img').attr('src').replace('SmallCover', 'LargeCover')
                    });
                });

                return newBookList;
            } catch (err) {
                console.error(err);
                return [];
            }
        });

        return flatten(results);
    } catch (err) {
        console.error(err);
        return [];
    }
};