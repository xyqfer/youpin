'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const {
        params,
        http,
    } = require('app-libs');
    const urls = [
        'https://timeline-merger-ms.juejin.im/v1/get_tag_entry?src=web&tagId=5597a05ae4b08a686ce56f6f&page=0&pageSize=50&sort=createdAt',
        'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&before=&limit=50&category=all',
        'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&before=&limit=50&category=5562b422e4b00c57d9b94b53',
    ];

    const results = await Promise.mapSeries(urls, async (url) => {
        try {
            const result = await http.get({
                json: true,
                uri: url,
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