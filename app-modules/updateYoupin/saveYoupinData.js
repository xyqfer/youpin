'use strict';

module.exports = async ({ data = [], dbName = '' }) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const {
        db: {
            saveDbData
        },
        params,
    } = require('app-libs');

    try {
        const results = await Promise.mapSeries(data, async (item) => {
            try {
                const data = await rp.post({
                    json: true,
                    uri: 'https://www.mijiayoupin.com/app/shop/pipe',
                    headers: {
                        'User-Agent': params.ua.mobile,
                        'Referer': 'https://www.mijiayoupin.com/detail?gid=505'
                    },
                    form: {
                        data: `{"detail":{"model":"Shopv2","action":"getDetail","parameters":{"gid":"${item.gid}"}},"comment":{"model":"Comment","action":"getList","parameters":{"goods_id":"${item.gid}","orderby":"1","pageindex":"0","pagesize":3}},"activity":{"model":"Activity","action":"getAct","parameters":{"gid":"${item.gid}"}}}`
                    }
                });
                const createTime = data.result.detail.data.good.ctime; // 创建时间

                return {
                    gid: item.gid,
                    url: item.url,
                    name: item.name,
                    createTime: new Date(createTime * 1000)
                };
            } catch (err) {
                console.error(err);
                return null;
            }
        });

        const data = results.filter((item) => {
            return item != null;
        });

        await saveDbData({
            dbName,
            data
        });

        return {
            success: true
        };
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};
