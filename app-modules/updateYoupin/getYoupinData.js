'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const { params } = require('app-libs');

    const data = await rp.get({
        json: true,
        uri: 'https://home.mi.com/lasagne/page/4',
        headers: {
            'User-Agent': params.ua.mobile,
        },
    });

    return data.floors.reduce((acc, item) => {
        let goodsList = [];

        if (item.data.result) {
            goodsList = item.data.result.goods_list;
        } else if (item.data.tabs) {
            goodsList = item.data.tabs.reduce((acc, tab) => {
                if (tab.result) {
                    tab.result.goods_list.forEach((goods) => {
                        return goods;
                    });
                }

                return acc;
            }, []);
        }

        goodsList.forEach((goods) => {
            acc.push({
                gid: goods.gid,
                url: goods.jump_url,
                name: goods.name,
            });
        });

        return acc;
    }, []);
};
