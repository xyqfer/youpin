'use strict';

module.exports = async () => {
    const {
        params,
        http,
    } = require('app-libs');
    const cheerio = require('cheerio');

    try {
        const htmlString = await http.get({
            uri: 'http://m.nbd.com.cn/web_app/column/697',
            headers: {
                'User-Agent': params.ua.mobile,
            },
        });
        const $ = cheerio.load(htmlString);
        const result = [];
        $('#newList > li').each(function() {
            const elem = $(this);
            const url = elem.find('a').attr('href');
            const title = elem.find('.m-newsTitle').text();
            const img = elem.find('.u-newsImg > img').attr('data-original');
            const desc = elem.find('.u-newsText').text();

            result.push({
                title,
                url,
                summary: `
                    <img src="${img}" referrerpolicy="no-referrer"><br>
                    ${desc}
                `
            });
        });
        $('.swiper-slide').each(function () {
            const elem = $(this);
            const url = elem.find('a').attr('href');
            const title = elem.find('.u-carouselText').text();
            const img = elem.find('.u-carouselImg').attr('data-src');

            result.push({
                title,
                url,
                summary: `
                    <img src="${img}" referrerpolicy="no-referrer">
                `
            });
        });
        return result;
    } catch (err) {
        console.error(err);
        return [];
    }
};