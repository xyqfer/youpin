'use strict';

const moment = require('moment');
const { http } = require('app-libs');

module.exports = async (req, res) => {
    const date = moment().add(-2, 'days').format('YYYYMMDD');
    let { results } = await http.get({
        uri: `https://us.leancloud.cn/1.1/statistics/details?from=${date}&group_by=clazz&to=${date}`,
        headers: {
            'x-avoscloud-application-id': process.env.LEANCLOUD_APP_ID,
            'x-avoscloud-application-key': process.env.LEANCLOUD_APP_KEY,
        },
        json: true,
    });

    const totalCount = results.sort(([, countA], [, countB]) => {
        return countA - countB;
    }).reduce((acc, [, count]) => {
        return acc += count;
    }, 0);

    const list = results.map(([name, count]) => {
        return {
            name,
            count,
            percent: count / totalCount,
        };
    });
    
    res.json({
        success: true,
        data: {
            date,
            list,
            totalCount,
        },
    });
};