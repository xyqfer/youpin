'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const {
        params,
        http,
    } = require('app-libs');

    const formatLink = (link, title) => {
        return `https://ibdkopi6vn.avosapps.us/poliwag#!/content?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}&region=te`;
    };
    const htmlString = await http.get({
        uri: 'https://www.economist.com/china/',
        headers: {
            'User-Agent': params.ua.pc
        },
    });
    const $ = cheerio.load(htmlString, {
        xmlMode: true
    });
    const data = $('.teaser-list > article').map(function() {
        const $item = $(this);
        const link = $item.find('.teaser__link').attr('href');
        const flytitle = $item.find('.flytitle-and-title__flytitle').text();
        const title = $item.find('.flytitle-and-title__title').text();
        const desc = $item.find('.teaser__text').text();
        const img = $item.find('.teaser__img').attr('src');

        return {
            url: `https://www.economist.com${link}`,
            title,
            summary: `
                <img src="${img}" referrerpolicy="no-referrer"><br>
                <div style="color: #e3120b;">${flytitle}</div>
                ${desc}<br><br>
                <a href="${formatLink(link, title)}">[转换地址]</a>
            `
        };
    }).get();

    return data;
};