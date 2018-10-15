'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const {
        params
    } = require('app-libs');

    const urls = [
        'https://rsshub.app/weibo/user/2294193132.json'
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const result = await rp.get({
                json: true,
                uri: url,
                headers: {
                    'User-Agent': params.ua.pc
                },
            });

            return result.items;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data).map(({ title, summary, url }) => {
        return {
            title,
            url,
            summary,
        };
    });
};