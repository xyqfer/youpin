'use strict';

module.exports = async ({
    offsets = [1]
}) => {
    const cheerio = require('cheerio');
    const flattenDeep = require('lodash/flattenDeep');
    const iconv = require('iconv-lite');
    const { params, http } = require('app-libs');
    const list = [
        'http://bang.dangdang.com/books/newhotsales/01.00.00.00.00.00-24hours-0-0-1-',
        'http://bang.dangdang.com/books/newhotsales/01.54.00.00.00.00-24hours-0-0-1-',
    ];
    const parseUrl = async (url) => {
        const htmlString = await http.get({
            uri: url,
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
    };

    try {
        const results = await Promise.mapSeries(offsets, async (page) => {
            try {
                return await Promise.mapSeries(list, async (url) => {
                    return await parseUrl(`${url}${page}`);
                });
            } catch (err) {
                console.error(err);
                return [];
            }
        });

        return flattenDeep(results);
    } catch (err) {
        console.error(err);
        return [];
    }
};