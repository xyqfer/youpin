'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const cheerio = require('cheerio');
    const {
        params,
        http,
    } = require('app-libs');

    try {
        const htmlString = await http.get({
            uri: 'https://www.businessinsider.com/',
            headers: {
                'User-Agent': params.ua.pc
            },
        });
        const $ = cheerio.load(htmlString);
        let result = [];

        $('#content .overridable').each(function () {
            const $item = $(this);
            const $link = $item.find('a');

            result.push({
                url: $link.attr('href'),
                title: $link.text(),
                summary: ''
            });
        });

        return await Promise.mapSeries(result, async (item) => {
            try {
                const htmlString = await http.get({
                    uri: item.url,
                    headers: {
                        'User-Agent': params.ua.pc,
                    },
                });
                const $ = cheerio.load(htmlString);
                const img = $('.image-figure-image > img').eq(0).attr('src');
                const alt = $('.image-source-caption').eq(0).text();
                const summaryList = $('.summary-list > li').map(function() {
                    const $item = $(this);
                    return `<li><strong>${$item.text()}</strong></li>`;
                }).get();

                if (summaryList && summaryList.length > 0) {
                    const imgElem = `<img src="${img}" referrerpolicy="no-referrer">`;
                    item.summary = `
                        ${(img && img !== '') ? imgElem : ''}
                        <div><strong>${alt}</strong></div>
                        <br>
                        <ul>
                            ${summaryList.join('')}
                        </ul>
                    `;

                    return item;
                } else {
                    return null;
                }
            } catch (err) {
                console.error(err);
                return item;
            }
        });
    } catch (err) {
        console.error(err);
        return [];
    }
};