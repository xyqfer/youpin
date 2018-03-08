'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-lib');

    try {
        const htmlString = await rp.get({
            uri: 'https://tympanus.net/codrops/all-articles/',
            headers: {
                'User-Agent': params.ua.mobile
            }
        });

        const $ = cheerio.load(htmlString);
        const postList = [];

        $('.ct-row article').each(function () {
            postList.push({
                postId: $(this).attr('id'),
                url: $(this).find('h3 > a').attr('href'),
                name: $(this).find('h3 > a').text()
            });
        });

        return postList;
    } catch (err) {
        console.log(err);
        return [];
    }
};