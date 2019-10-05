'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const iconv = require('iconv-lite');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-libs');

    try {
        const htmlString = await rp.get({
            uri: 'http://www.china-pub.com/xinshu/',
            headers: {
                'User-Agent': params.ua.pc
            }
        });
        const $ = cheerio.load(htmlString);
        const targetUrlList = [];

        $('.nb_sec1').each(function () {
            targetUrlList.push($(this).find('.nb_sec1_left h1 a').attr('href'));
        });

        const result = await Promise.map(targetUrlList, async (url) => {
            try {
                return await rp.get({
                    uri: url,
                    encoding : null,
                    headers: {
                        'User-Agent': params.ua.pc
                    }
                });
            } catch (err) {
                console.error(err);
                return null;
            }
        });

        const bookList = [];

        result.forEach((htmlString) => {
            if (htmlString != null) {
                const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));

                $('.bookshow').each(function () {
                    bookList.push({
                        name: $(this).find('.bookName a').attr('title'),
                        url: $(this).find('.bookName a').attr('href')
                    });
                });
            }
        });

        return uniqBy(bookList, 'url');
    } catch (err) {
        console.error(err);
        return [];
    }
};
