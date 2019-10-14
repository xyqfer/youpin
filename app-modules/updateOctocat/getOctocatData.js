'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const { params, http } = require('app-libs');

    const xmlString = await http.get({
        uri: 'https://feeds.feedburner.com/Octocats',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });
    const $ = cheerio.load(xmlString, {
        normalizeWhitespace: true,
        xmlMode: true,
    });
    const result = [];

    $('entry').each(function() {
        const $item = $(this);

        result.push({
            url: $item.find('link').attr('href'),
            title: $item.find('title').text() || '',
            summary: $item.find('content').html(),
        });
    });

    return result;
};
