'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const {
        params,
        http
    } = require('app-libs');

    const htmlString = await http.get({
        uri: 'http://blogread.cn/news/newest.php',
        headers: {
            'User-Agent': params.ua.pc
        }
    });

    const posts = [];
    const $ = cheerio.load(htmlString);

    $('.media').each(function () {
        const $item = $(this);
        const $link = $item.find('dt a');
        const title = $link.text();

        posts.push({
            title,
            url: $link.attr('href'),
            summary: $item.find('dd').text()
        });
    });

    return posts;
};