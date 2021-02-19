'use strict';
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const uniqBy = require('lodash/uniqBy');
const { http } = require('app-libs');

module.exports = async () => {
    try {
        const htmlString = await http.get({
            uri: 'http://www.china-pub.com/xinshu/',
        });
        const $ = cheerio.load(htmlString);
        const targetUrlList = [];

        $('.nb_sec1').each(function() {
          const url = $(this).find('.nb_sec1_left h1 a').attr('href');

          if (url) targetUrlList.push(url);
        });

        const result = await Promise.map(targetUrlList, async (url) => {
            try {
                return await http.get({
                    uri: url,
                    encoding: null,
                });
            } catch (err) {
                console.error(err);
                return null;
            }
        });

        const bookList = [];

        result.forEach((htmlString) => {
            /* eslint-disable eqeqeq */
            if (htmlString != null) {
                const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));

                $('.bookshow').each(function() {
                    bookList.push({
                        name: $(this)
                            .find('.bookName a')
                            .attr('title'),
                        url: $(this)
                            .find('.bookName a')
                            .attr('href'),
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
