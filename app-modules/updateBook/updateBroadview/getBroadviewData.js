'use strict';

const _ = require('lodash');
const { crawler, } = require('app-libs');

module.exports = async ({
    offsets = [0],
}) => {
    const hostPrefix = 'http://www.broadview.com.cn';

    try {
        const results = await Promise.mapSeries(offsets, async (page) => {
            try {
                const $ = await crawler(`http://www.broadview.com.cn/book?tab=book&sort=new&page=${page}`);
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

        return _.flatten(results);
    } catch (err) {
        console.error(err);
        return [];
    }
};