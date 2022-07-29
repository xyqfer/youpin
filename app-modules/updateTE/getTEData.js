'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const Parser = require('rss-parser');
    const { params, http } = require('app-libs');

    const formatLink = (link, title) => `https://ibdkopi6vn.erjsnfs.com/poliwag#!/content?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title)}&region=te`;

    const host = 'https://www.economist.com';
    const htmlString = await http.get({
        uri: host + '/printedition/2',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });
    const $ = cheerio.load(htmlString);
    const result = $('.print-edition__content ul.list > li.list__item')
        .filter(function() {
            return (
                $(this)
                    .find('.list__title')
                    .text()
                    .trim()
                    .toLowerCase() === 'china'
            );
        })
        .map(function() {
            const $elem = $(this);
            return $elem
                .find('.list__link')
                .map(function() {
                    const $link = $(this);
                    let title = $link.find('.print-edition__link-title').text();

                    if (title === '') {
                        title = $link.find('.print-edition__link-title-sub').text();
                    }

                    const link = $link.attr('href');
                    const url = formatLink(link, title);
                    const summary = $link.find('.print-edition__link-flytitle').text();
                    return {
                        title,
                        url,
                        summary,
                    };
                })
                .get();
        })
        .get();

    const parser = new Parser();
    const feed = await parser.parseURL('https://www.economist.com/the-economist-explains/rss.xml');
    feed.items.forEach((item) => {
        const title = item.title;
        const link = item.link.replace('https://www.economist.com', '');
        const url = formatLink(link, title);

        result.push({
            title,
            url,
            summary: item.content || item.description || '',
        });
    });

    return result;
};
