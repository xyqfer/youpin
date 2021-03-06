'use strict';

module.exports = ({ htmlString = '', type = 'popular' }) => {
    const cheerio = require('cheerio');

    const $ = cheerio.load(htmlString);
    const data = [];
    const index = type === 'popular' ? 1 : 0;

    $('.stickers-snippets__snippet')
        .eq(index)
        .find('.stickers-snippet-item')
        .each(function() {
            const $elem = $(this);
            const sticker = {
                name: $elem.find('.stickers-snippet-item__name').text(),
                link: $elem.attr('href').replace('https://tlgrm.eu/stickers/', ''),
                cover: $elem.find('.stickers-snippet-item__cover').attr('src'),
            };
            data.push(sticker);
        });

    return data;
};
