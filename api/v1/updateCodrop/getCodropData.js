'use strict';

module.exports = async () => {
    const path = require('path');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const params = require(path.resolve(process.cwd(), 'api/lib/params'));

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