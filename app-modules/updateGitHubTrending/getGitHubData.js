'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-libs');

    const urls = [
        'https://github.com/trending',
        'https://github.com/trending/javascript',
        'https://github.com/trending/css',
        'https://github.com/trending/vue',
        'https://github.com/trending/unknown'
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const htmlString = await rp.get({
                uri: url,
                headers: {
                    'User-Agent': params.ua.pc
                },
            });

            const $ = cheerio.load(htmlString);
            const repositoryList = [];

            $('.repo-list > li').each(function () {
                const $elem = $(this);

                repositoryList.push({
                    name: $elem.find('h3 a').text().replace(/\s+/g, ''),
                    url: `https://github.com${$elem.find('h3 a').attr('href')}`,
                    desc: $elem.find('.py-1').text().replace(/\n+/g, '').trim(),
                    lang: $elem.find('[itemprop="programmingLanguage"]').text().replace(/\n+/g, '').trim()
                });
            });

            return repositoryList;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return uniqBy(flatten(data), 'url');
};