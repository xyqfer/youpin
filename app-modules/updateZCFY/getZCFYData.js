'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const { params } = require('app-libs');

    const urls = [];

    for (let i = 1; i <= 3; i++) {
        urls.push(`http://www.zcfy.cc/?page=${i}&mode=loadmore`);
    }

    const result = await Promise.mapSeries(urls, async (uri) => {
        try {
            const htmlString = await rp.get({
                uri,
                headers: {
                    'User-Agent': params.ua.pc
                }
            });

            const $ = cheerio.load(htmlString);
            const postList = [];

            $('.uk-card').each(function () {
                const $elem = $(this);
                const url = $elem.find('.uk-link-reset').attr('href');

                if (url != null && url !== '') {
                    postList.push({
                        title: $elem.find('.uk-card-header .uk-link-reset').text(),
                        url: `http://www.zcfy.cc${$elem.find('.uk-link-reset').attr('href')}`,
                        desc: $elem.find('.uk-card-body .uk-card-body').text()
                    });
                }
            });

            return postList;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(result);
};
