'use strict';

/**
 * 更新今日状态
 */
module.exports = (req, res) => {
    const path = require('path');
    const moment = require('moment');
    const { getDbData, updateDbData } = require(path.resolve(process.cwd(), 'api/lib/db'));

    const dbName = 'DayStatusLog';
    const limit = 1;
    const today = new Date(`${moment().format('YYYY-MM-DD')} 00:00:00`);
    const todayStatusLog = req.body.today;

    (async () => {
        try {
            const todayData = await getDbData({
                dbName,
                limit,
                query: {
                    equalTo: ['time', today]
                }
            });

            if (todayData.length > 0) {
                updateDbData({
                    dbName,
                    id: todayData[0].id,
                    data: todayStatusLog
                });
            } else {
                throw '今日数据不存在';
            }

            res.json({
                success: true
            });
        } catch (err) {
            console.error(err);
            res.json({
                success: false
            });
        }
    })();
};