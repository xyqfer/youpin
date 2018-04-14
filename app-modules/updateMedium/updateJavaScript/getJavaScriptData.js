'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-libs');

    const urls = [
        'https://medium.com/_/api/tags/javascript/stream?limit=100&sortBy=published-at'
    ];

    const result = await Promise.mapSeries(urls, async (uri) => {
        try {
            const result = await rp.get({
                uri,
                headers: {
                    'User-Agent': params.ua.pc,
                    'Referer': 'https://medium.com/tag/javascript/latest'
                }
            });

            const data = JSON.parse(result.replace('])}while(1);</x>', ''));
            let postList = [];

            if (data.success) {
                postList = Object.values(data.payload.references.Post).map((item) => {
                    const url = `https://medium.com/@${data.payload.references.User[item.creatorId].username}/${item.uniqueSlug}`;

                    return {
                        url,
                        title: item.title
                    };
                });
            }

            return postList;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return uniqBy(flatten(result), 'url');
};
