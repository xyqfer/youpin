'use strict';

module.exports = async ({
    offsets = [1]
}) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const { params } = require('app-libs');

    try {
        const results = await Promise.mapSeries(offsets, async (page) => {
            try {
                const result = await rp.post({
                    json: true,
                    uri: 'https://www.epubit.com/book/search',
                    headers: {
                        'User-Agent': params.ua.pc
                    },
                    form: {
                        page,
                        rows: 12,
                        order: 'desc',
                        sort: 'publishDate',
                        listed: 1,
                        isPaper: 1,
                        condition: 'booklist'
                    }
                });

                return result.data.rows.map((item) => {
                    return {
                        title: item.name,
                        url: `https://www.epubit.com/book/detail?id=${item.id}`,
                        cover: `https://www.epubit.com/oldres/writeBookImg/${item.id}`
                    };
                });
            } catch (err) {
                console.error(err);
                return [];
            }
        });

        return flatten(results);
    } catch (err) {
        console.error(err);
        return [];
    }
};