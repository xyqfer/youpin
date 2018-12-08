'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const uniqBy = require('lodash/uniqBy');
    const {
        params,
        http
    } = require('app-libs');

    const uri = 'https://www.chandashi.com/ranking/featured/page/today/date/';
    const htmlString = await http.get({
        uri,
        headers: {
            'User-Agent': params.ua.pc,
            Referer: uri,
        }
    });

    const apps = [];
    const $ = cheerio.load(htmlString);

    $('.featured-content .table-box tbody tr').each(function () {
        const $item = $(this);
        const title = $item.find('.app-title-text').text();
        const logo = $item.find('a > img').attr('src').replace('60x60', '200x200');
        const desc = $item.find('.app-info').text();
        const link = $item.find('.app-title').attr('href');
        const id = link.replace(/\D/g, '');

        apps.push({
            title,
            url: `https://itunes.apple.com/cn/app/id${id}`,
            summary: `
                <img referrerpolicy="no-referrer" src="${logo}"><br>
                ${desc}
            `
        });
    });

    return uniqBy(apps, 'url');
};