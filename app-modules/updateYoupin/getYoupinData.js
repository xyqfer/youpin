'use strict';

const { http, params } = require('app-libs');

module.exports = async () => {
    const data = await http.get({
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
                    tab.result.goods_list.forEach((goods) => goods);
                }

                return acc;
            }, []);
        }

        goodsList.forEach((goods) => {
            acc.push({
                gid: goods.gid,
                url: goods.jump_url,
                name: goods.name,
                summary: `<img referrerpolicy="no-referrer" src="${goods.pic_url}"><br>${goods.summary}`,
            });
        });

        return acc;
    }, []);
};
