'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    const htmlString = await rp.get({
        uri: 'https://tympanus.net/codrops/all-articles/',
        headers: {
            'User-Agent': params.ua.mobile,
        },
    });

    const $ = cheerio.load(htmlString);
    const postList = [];

    $('.ct-archive-container > article').each(function() {
        postList.push({
            postId: $(this).attr('id'),
            url: $(this)
                .find('h2 > a')
                .attr('href'),
            name: $(this)
                .find('h2 > a')
                .text(),
        });
    });

    return postList;
};
