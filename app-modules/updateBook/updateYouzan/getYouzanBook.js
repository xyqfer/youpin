'use strict';

module.exports = async () => {
    const flatten = require('lodash/flatten');
    const uniqBy = require('lodash/uniqBy');
    const { params, http } = require('app-libs');

    const pageCount = 3;
    const pageCountList = [];
    const aliasList = [
        'lv78hovm',
        '848z7n3u'
    ];

    for (let i = 1; i <= pageCount; i++) {
        pageCountList.push(i);
    }

    try {
        const results = await Promise.mapSeries(aliasList, async (alias) => {
            try {
                return flatten(await Promise.mapSeries(pageCountList, async (page) => {
                    const htmlString = await http.get({
                        uri: `https://h5.youzan.com/v2/showcase/tag?alias=${alias}&page=${page}`,
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
                }));
            } catch (err) {
                console.error(err);
                return [];
            }
        });

        return uniqBy(flatten(results).map((item) => {
            if (!item.image_url.startsWith('https://img.yzcdn.cn/') && !item.image_url.startsWith('http://img.yzcdn.cn/')) {
                item.image_url = `https://img.yzcdn.cn/${item.image_url}`
            }

            return {
                name: item.title,
                url: item.url,
                cover: item.image_url,
                bookId: item.id + ''
            };
        }), 'url');
    } catch (err) {
        console.error(err);
        return [];
    }
};