'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const {
        params,
        http,
    } = require('app-libs');

    const htmlString = await http.get({
        uri: 'http://weekly.caixin.com/index-mob.html',
        headers: {
            'User-Agent': params.ua.mobile,
        },
    });

    const magazines = [];
    const $ = cheerio.load(htmlString);
    const $magazine = $('.new-issue');
    const magazineUrl = $magazine.find('.new-issue-info > h2').attr('onclick').slice(24, -1);

    magazines.push({
        img: $magazine.find('.new-fm > img').attr('src'),
        title: $magazine.find('.new-issue-info > h2').text(),
        no: magazineUrl,
        time: $magazine.find('.new-issue-info > var').text(),
        url: magazineUrl,
    });

    return magazines;
};