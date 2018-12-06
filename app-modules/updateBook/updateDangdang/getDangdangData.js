'use strict';

module.exports = async ({
    offsets = [1]
}) => {
    const Promise = require('bluebird');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const iconv = require('iconv-lite');
    const { params, http } = require('app-libs');

    try {
        const results = await Promise.mapSeries(offsets, async (page) => {
            try {
                const htmlString = await http.get({
                    uri: `http://bang.dangdang.com/books/newhotsales/01.00.00.00.00.00-24hours-0-0-1-${page}`,
                    headers: {
                        'User-Agent': params.ua.pc
                    },
                    encoding: null,
                });

                const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));
                const newBookList = [];

                $('.bang_list > li').each(function () {
                    newBookList.push({
                        title: $(this).find('.name a').attr('title'),
                        url: $(this).find('.name a').attr('href'),
                        cover: $(this).find('.pic img').attr('src').replace('1_l', '1_u')
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