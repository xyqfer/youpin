'use strict';

module.exports = async ({ offsets = [1] }) => {
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { params } = require('app-libs');

    try {
        const results = await Promise.reduce(
            offsets,
            async (totalData) => {
                let data = [];
                let sinceId = '';

                if (totalData.length > 0) {
                    sinceId = totalData[totalData.length - 1].id - 1;
                }

                try {
                    const result = await rp.get({
                        json: true,
                        uri: `https://m.weibo.cn/api/container/getIndex?jumpfrom=weibocom&containerid=100808cc06a5ccafffbece5e440542d5bc430f_-_sort_time&since_id=${sinceId}`,
                        headers: {
                            'User-Agent': params.ua.mobile,
                        },
                    });

                    data = result.data.cards[0].card_group.map((card) => card.mblog);
                } catch (err) {
                    console.error(err);
                    data = [];
                }

                return [...totalData, ...data];
            },
            []
        );
        /* eslint-disable eqeqeq */
        return uniqBy(flatten(results), 'id')
            .map((item) => {
                try {
                    const desc = item.text;
                    const cover = (item.pics && item.pics[0] && item.pics[0].large.url) || '';
                    const bookId = item.id;
                    let title = '';

                    if (/《(.*)》/.test(item.text)) {
                        title = item.text.match(/《(.*)》/)[0];
                    }

                    return {
                        title,
                        cover,
                        bookId,
                        desc,
                    };
                } catch (err) {
                    console.error(err);
                    return [];
                }
            })
            .filter((item) => item.title !== '' && item.title != null);
    } catch (err) {
        console.error(err);
        return [];
    }
};
