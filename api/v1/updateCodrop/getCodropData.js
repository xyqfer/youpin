'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');

    try {
        const htmlString = await rp.get({
            uri: 'https://tympanus.net/codrops/all-articles/',
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
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