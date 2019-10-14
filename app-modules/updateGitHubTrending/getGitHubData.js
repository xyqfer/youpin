'use strict';

const _ = require('lodash');
const { crawler } = require('app-libs');

module.exports = async () => {
    const urls = ['https://github.com/trending', 'https://github.com/trending/javascript', 'https://github.com/trending/css', 'https://github.com/trending/vue', 'https://github.com/trending/unknown'];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const $ = await crawler(url);
            const repositoryList = [];

            $('article').each(function() {
                const $elem = $(this);

                repositoryList.push({
                    name: $elem
                        .find('h1')
                        .text()
                        .replace(/\s+/g, ''),
                    url: `https://github.com${$elem.find('h1 a').attr('href')}`,
                    desc: $elem
                        .find('.pr-4')
                        .text()
                        .replace(/\n+/g, '')
                        .trim(),
                    lang: $elem
                        .find('span[itemprop="programmingLanguage"]')
                        .text()
                        .replace(/\n+/g, '')
                        .trim(),
                });
            });

            return repositoryList;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return _.uniqBy(_.flatten(data), 'url');
};
