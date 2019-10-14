'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { params, http } = require('app-libs');

    const results = [];

    const htmlString = await http.get({
        uri: 'https://next.36kr.com/posts?sort=hot',
        headers: {
            'User-Agent': params.ua.mobile,
        },
    });

    const $ = cheerio.load(htmlString);

    $('.post')
        .eq(0)
        .find('.product-item')
        .each(function() {
            const $elem = $(this);

            results.push({
                title: $elem.find('.post-url').text(),
                url: `https://next.36kr.com${$elem.find('.post-url').attr('href')}`,
                desc: $elem.find('.post-tagline').text(),
            });
        });

    return uniqBy(flatten(results), 'url');
};
