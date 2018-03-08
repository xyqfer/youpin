'use strict';

module.exports = (req, res, next) => {
    const { getDbData } = require('app-lib/db');

    (async () => {
        try {
            const dbName = 'Activities';
            const limit = +(req.query.limit || 5);
            const data = await getDbData({
                dbName,
                limit,
                query: {
                    ascending: ['startTime'],
                    greaterThanOrEqualTo: ['endTime', new Date()]
                }
            });

            res.json({
                success: true,
                data,
                msg: '查询成功'
            });
        } catch (err) {
            console.error(err);
            res.json({
                success: false,
                data: null,
                msg: '查询失败'
            });
        }
    })();
};