'use strict';

module.exports = async ({ offsets = [1] }) => {
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const { params } = require('app-libs');

    try {
        const results = await Promise.mapSeries(offsets, async (offset) => {
            try {
                const result = await rp.get({
                    json: true,
                    uri: `https://pubcloud.ptpress.cn/pubcloud/content/front/portal/getUbookList?page=${offset}&row=20&dateSort=desc&startPrice=&endPrice=&tagId=`,
                    headers: {
                        'User-Agent': params.ua.pc,
                        'X-Requested-With': 'XMLHttpRequest',
                        'Origin-Domain': 'www.epubit.com',
                    },
                });

                return result.data.records.map((item) => ({
                    title: item.name,
                    url: `https://www.epubit.com/bookDetails?id=${item.code}`,
                    cover: item.logo,
                }));
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
