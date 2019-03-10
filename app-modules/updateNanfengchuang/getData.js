'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const {
        params,
        http,
    } = require('app-libs');

    let htmlString = await http.get({
        uri: 'https://www.nfcmag.com/magazine.html',
        headers: {
            'User-Agent': params.ua.pc
        }
    });

    let $ = cheerio.load(htmlString);
    const $magazine = $('.magazine-items').eq(1);
    const link = 'https://www.nfcmag.com' + $magazine.find('h6 > a').attr('href');

    htmlString = await http.get({
        uri: link,
        headers: {
            'User-Agent': params.ua.pc
        }
    });
    $ = cheerio.load(htmlString);

    const magazines = [];
    $('.article-box.comBox > ul >li').each(function () {
        const $item = $(this);
        const $link = $item.find('h5 > a');
        const title = $link.text();
        const link = 'https://www.nfcmag.com' + $link.attr('href');

        magazines.push({
            title,
            url: 'https://www.instapaper.com/text?u=' + encodeURIComponent(link),
        });
    });

    return magazines;
};