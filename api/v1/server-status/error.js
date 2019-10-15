'use strict';

const moment = require('moment');
const { http, db } = require('app-libs');

module.exports = async (req, res) => {
    const { since } = req.query;
    const startTime = new Date(since).getTime();
    const serverInfo = await db.getData({
        dbName: 'ServerInfo',
        query: {
            ascending: ['createdAt'],
        },
    });

    const errorInfoList = await Promise.mapSeries(serverInfo, async (item) => {
        let errorInfo = await http.get({
            uri: `https://us.leancloud.cn/1.1/tables/EngineLogs?group=${item.group}&level=error&limit=1000&production=1`,
            headers: {
                'x-avoscloud-application-id': item.appId,
                'x-avoscloud-application-key': item.appKey,
            },
            json: true,
        });
        errorInfo = errorInfo
            .filter(({ time }) => {
                const timestamp = new Date(time).getTime();
                return timestamp > startTime;
            })
            .reverse()
            .map((item) => {
                item.displayTime = moment(item.time)
                    .utcOffset(8)
                    .format('HH:mm:ss');
                return item;
            });

        return {
            name: item.name,
            errorInfo,
        };
    });

    res.json({
        success: true,
        data: {
            errorInfoList,
        },
    });
};
