'use strict';

const Promise = require('bluebird');
const {
    params,
    http,
} = require('app-libs');
const cheerio = require('cheerio');
const flatten = require('lodash/flatten');
const uniqBy = require('lodash/uniqBy');

module.exports = async () => {
    const htmlString = await http.get({
        uri: 'https://betterdev.link/issues',
        headers: {
            'User-Agent': params.ua.pc
        },
    });
    const $ = cheerio.load(htmlString);
    const linkList = $('.issue-item').map(function() {
        const $elem = $(this);
        return 'https://betterdev.link' + $elem.find('.finder-item-link').attr('href');
    }).get();

    const videoList = await Promise.mapSeries(linkList, async (link) => {
        const htmlString = await http.get({
            uri: link,
            headers: {
                'User-Agent': params.ua.pc
            },
        });
        const $ = cheerio.load(htmlString);
        let videoLinkList = [];

        $('h3.subtitle').each(function() {
            const $elem = $(this);

            if ($elem.text().trim().toLowerCase() === 'video') {
                $elem.siblings(".issue-link").each(function() {
                    const videoLink = $(this).find('a').attr('href');
                    videoLinkList.push({
                        link: videoLink,
                    });
                });
            }
        });

        return videoLinkList;
    });

    return uniqBy(flatten(videoList), 'link');
};