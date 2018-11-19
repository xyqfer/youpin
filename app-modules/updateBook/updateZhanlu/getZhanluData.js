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
                const result = await rp.get({
                    json: true,
                    uri: `https://h5.youzan.com/wscshop/showcase/goods/allGoods.json?page=${page}&pageSize=20&offlineId=0&kdtId=18826691`,
                    headers: {
                        'User-Agent': params.ua.pc
                    }
                });

                return result.data.list;
            } catch (err) {
                console.error(err);
                return [];
            }
        });

        return flatten(results).map((item) => {
            return {
                title: item.title,
                url: item.url,
                cover: item.image_url,
                bookId: item.id
            };
        });
    } catch (err) {
        console.error(err);
        return [];
    }
};