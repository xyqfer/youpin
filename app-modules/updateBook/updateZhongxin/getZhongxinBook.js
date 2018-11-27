'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const { params } = require('app-libs');

    const pageCount = 3;
    const pageCountList = [];

    for (let i = 1; i <= pageCount; i++) {
        pageCountList.push(i);
    }

    try {
        const results = await Promise.mapSeries(pageCountList, async (page) => {
            try {
                const htmlString = await rp.get({
                    uri: `https://h5.youzan.com/v2/showcase/tag?alias=lv78hovm&page=${page}`,
                    headers: {
                        'User-Agent': params.ua.pc
                    }
                });

                const bookDetail = JSON.parse(htmlString.match(/window\._global = (.+)[\s\S]*<\/script>[\s\S]*<\/head>/)[1]);
                return bookDetail.feature_components.reduce((goods, item) => {
                    if (item.type === 'goods') {
                        goods = item.goods;
                    }

                    return goods;
                }, []);
            } catch (err) {
                console.error(err);
                return [];
            }
        });

        return flatten(results).map((item) => {
            return {
                name: item.title,
                url: item.url,
                cover: item.image_url,
                bookId: item.id + ''
            };
        });
    } catch (err) {
        console.error(err);
        return [];
    }
};