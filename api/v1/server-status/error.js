'use strict';

const { http, db } = require('app-libs');

module.exports = async (req, res) => {
    const { since } = req.query;
    const startTime = new Date(since).getTime();
    const serverInfo = await db.getData({
        dbName: 'ServerInfo',
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
        errorInfo = errorInfo.filter(({ time }) => {
            const timestamp = new Date(time).getTime();
            return timestamp > startTime;
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
