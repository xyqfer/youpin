'use strict';

module.exports = async ({
    offsets = [1]
}) => {
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const { params } = require('app-libs');

    try {
        const results = await Promise.mapSeries(offsets, async (page) => {
            try {
                const result = await rp.get({
                    json: true,
                    uri: 'https://www.pubcloud.com/pubcloud/content/front/portal/getUbookList?page=1&row=20&dateSort=desc&startPrice=&endPrice=&tagId=',
                    headers: {
                        'User-Agent': params.ua.pc,
                        'X-Requested-With': 'XMLHttpRequest',
                        'Origin-Domain': 'www.epubit.com',
                    },
                });

                return result.data.records.map((item) => {
                    return {
                        title: item.name,
                        url: `https://www.epubit.com/bookDetails?id=${item.code}`,
                        cover: item.logo,
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