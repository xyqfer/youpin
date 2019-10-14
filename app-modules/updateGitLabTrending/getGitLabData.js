'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    const xmlString = await rp.get({
        uri: 'https://rsshub.app/gitlab/explore/trending',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });
    const $ = cheerio.load(xmlString, {
        normalizeWhitespace: true,
        xmlMode: true,
    });
    const result = [];

    $('item').each(function() {
        const $item = $(this);

        result.push({
            url: $item.find('link').text(),
            title: $item.find('title').text(),
            summary: $item.find('description').text(),
        });
    });

    return result;
};
