'use strict';

module.exports = () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const iconv = require('iconv-lite');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-lib');

    return rp.get({
        uri: 'http://www.china-pub.com/xinshu/',
        headers: {
            'User-Agent': params.ua.pc
        }
    }).then((htmlString) => {
        const $ = cheerio.load(htmlString);
        const targetUrlList = [];

        $('.nb_sec1').each(function () {
            targetUrlList.push($(this).find('.nb_sec1_left h1 a').attr('href'));
        });

        return Promise.map(targetUrlList, (url) => {
            return rp.get({
                uri: url,
                encoding : null,
                headers: {
                    'User-Agent': this.ua
                }
            });
        });
    }).then((result) => {
        const bookList = [];

        result.forEach((htmlString) => {
            const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));

            $('.bookshow').each(function () {
                bookList.push({
                    name: $(this).find('.bookName a').attr('title'),
                    url: $(this).find('.bookName a').attr('href')
                });
            });
        });

        return uniqBy(bookList, 'url');
    }).catch((err) => {
        console.error(err);
        return [];
    });
};
