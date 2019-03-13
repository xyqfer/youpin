'use strict';

module.exports = async () => {
    const {
        params,
        http,
    } = require('app-libs');
    const cheerio = require('cheerio');

    try {
        const htmlString = await http.get({
            uri: 'http://m.nbd.com.cn/web_app/special_news',
            headers: {
                'User-Agent': params.ua.mobile,
            },
        });
        const $ = cheerio.load(htmlString);
        return $('.m-specialList > li').slice(0, 1).map(function() {
            const elem = $(this);
            const url = elem.find('a').attr('href');
            const title = elem.find('.m-specialText').text();
            const img = elem.find('.m-speicalImg > img').attr('data-original');

            return {
                title,
                url,
                summary: `
                    <img src="${img}" referrerpolicy="no-referrer">
                `
            };
        }).get();
    } catch (err) {
        console.error(err);
        return [];
    }
};