'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-libs');

    const urls = [
        {
            url: 'https://www.lagou.com/gongsi/searchInterviewExperiences.json',
            body: {
                companyId: 84693,
            },
        },
    ];

    const results = await Promise.mapSeries(urls, async ({ url = '', body = {} }) => {
        try {
            const result = await rp
                .post({
                    uri: url,
                    headers: {
                        'User-Agent': params.ua.pc,
                    },
                    form: {
                        pageSize: 10,
                        pageNo: 1,
                        ...body,
                    },
                })
                .then((data) => JSON.parse(data));

            return result.content.data.page.result;
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return uniqBy(flatten(results), 'id').map((item) => ({
        commentId: item.id,
    }));
};
