'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const {
        params,
        http
    } = require('app-libs');

    const xmlString = await http.get({
        uri: 'https://rsshub.app/juejin/pins',
        headers: {
            'User-Agent': params.ua.pc,
        }
    });

    const $ = cheerio.load(xmlString, {
        normalizeWhitespace: true,
        xmlMode: true
    });
    const result = [];
    $('item').each(function() {
        const $item = $(this);

        result.push({
            url: $item.find('link').text(),
            title: $item.find('title').text(),
            summary: $item.find('description').text()
        });
    });

    return result;
};