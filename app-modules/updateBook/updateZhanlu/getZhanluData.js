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
                const htmlString = await rp.get({
                    uri: `https://h5.youzan.com/v2/showcase/goods/allgoods?kdt_id=18826691&p=${page}`,
                    headers: {
                        'User-Agent': params.ua.pc
                    }
                });

                const bookDetail = JSON.parse(htmlString.match(/var _showcase_components = (.+)} else {/)[1].trim().slice(0, -1));
                return bookDetail[0].goods;
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