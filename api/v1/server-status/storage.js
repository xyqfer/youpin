'use strict';

const moment = require('moment');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const date = moment().format('YYYYMMDD');
    const { results } = await http.get({
        uri: `https://us.leancloud.cn/1.1/statistics/details?from=${date}&group_by=clazz&to=${date}`,
        headers: {
            'x-avoscloud-application-id': process.env.LEANCLOUD_APP_ID,
            'x-avoscloud-application-key': process.env.LEANCLOUD_APP_KEY,
        },
        json: true,
    });

    const totalCount = results.sort(([, countA], [, countB]) => countA - countB).reduce((acc, [, count]) => (acc += count), 0);

    const list = results.map(([name, count]) => ({
        name,
        count,
        percent: count / totalCount,
    }));

    res.json({
        success: true,
        data: {
            date,
            list,
            totalCount,
        },
    });
};
