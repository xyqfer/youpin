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
            const result = await rp.get({
                json: true,
                uri: 'https://timeline-merger-ms.juejin.im/v1/get_tag_entry?src=web&tagId=5597a05ae4b08a686ce56f6f&page=0&pageSize=50&sort=createdAt',
                headers: {
                    'User-Agent': params.ua.pc,
                },
            });

            return result.d.entrylist;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return uniqBy(flatten(results), 'objectId').map((item) => {
        return {
            postId: item.objectId,
            title: item.title,
            url: item.originalUrl,
            summary: item.summaryInfo,
        };
    });
};