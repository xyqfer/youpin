'use strict';
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const { http, } = require('app-libs');

module.exports = async (data) => {
    try {
        const result = await Promise.mapSeries(data, async (book) => {
            try {
                const htmlString = await http.get({
                    uri: book.url,
                    encoding : null,
                });

                const $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));
                let time;

                $('#con_a_1 .pro_r_deta').eq(0).find('li').each(function () {
                    const text = $(this).text();

                    if (text.includes('上架时间')) {
                        time = text.replace('上架时间：', '');
                    }
                });

                if (time) {
                    const year = +time.split("-")[0];

                    if (year <= 2016) {
                        return false;
                    } else {
                        const cover = $('.gray12a img').attr('src');
                        const intro = $(".pro_name_intr").text();

                        book.cover = cover;
                        book.intro = intro;
                        return book;
                    }
                } else {
                    return false;
                }
            } catch (err) {
                console.error(err);
                return false;
            }
        });

        return result.filter((book) => {
            return book;
        });
    } catch (err) {
        console.error(err);
        return [];
    }
};