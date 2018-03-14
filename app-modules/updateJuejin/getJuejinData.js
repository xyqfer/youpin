'use strict';

module.exports = async ({
    offsets = [0]
}) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const {
        params
    } = require('app-libs');

    const results = await Promise.mapSeries(offsets, async (offset) => {
        try {
            const result = await rp.post({
                json: true,
                uri: 'http://api.xitu.io/resources/gold',
                headers: {
                    'User-Agent': params.ua.pc,
                },
                body: {
                    "category": "frontend",
                    "order": "time",
                    "offset": offset,
                    "limit": 30
                }
            });

            return result.data;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return uniqBy(flatten(results), 'id').map((item) => {
        return {
            postId: item.id,
            title: item.title,
            url: item.originalUrl
        };
    });
};