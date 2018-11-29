'use strict';

module.exports = async () => {
    const cheerio = require('cheerio');
    const {
        params,
        http
    } = require('app-libs');

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate();
    const uri = `https://www.chandashi.com/ranking/featured/page/today/date/${year}${month}${date}.html`;
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
        const title = $item.find('.td-3').text();
        const logo = $item.find('a > img').attr('src');
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

    return apps;
};