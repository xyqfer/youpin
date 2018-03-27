'use strict';

module.exports = async ({
    offsets = [0]
}) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const { params } = require('app-libs');

    const hostPrefix = 'http://www.ituring.com.cn';

    try {
        const results = await Promise.mapSeries(offsets, async (page) => {
            try {
                const htmlString = await rp.get({
                    uri: `http://www.ituring.com.cn/book?sort=newest&page=${page}`,
                    headers: {
                        'User-Agent': params.ua.pc
                    }
                });

                const $ = cheerio.load(htmlString);
                const newBookList = [];

                $('.block-books li').each(function () {
                    newBookList.push({
                        title: $(this).find('.name a').text().trim(),
                        url: hostPrefix + $(this).find('.book-img a').attr('href'),
                        cover: $(this).find('.book-img img').attr('src'),
                        desc: $(this).find('.intro').text().trim()
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