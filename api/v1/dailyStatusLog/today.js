'use strict';

/**
 * 获取今日状态
 */
module.exports = (req, res) => {
    const path = require('path');
    const moment = require('moment');
    const { getDbData, saveDbData } = require(path.resolve(process.cwd(), 'api/lib/db'));

    moment.locale('zh-cn');

    const dbName = 'DayStatusLog';
    const today = new Date(`${moment().format('YYYY-MM-DD')} 00:00:00`);
    const limit = 1;

    (async () => {
        try {
            let todayData = await getDbData({
                dbName,
                limit,
                query: {
                    equalTo: ['time', today]
                }
            });

            if (todayData.length === 0) {
                todayData = await saveDbData({
                    dbName,
                    data: [
                        {
                            time: today
                        }
                    ]
                });
            }

            const result = todayData[0] || {};

            result.time = moment(today).format('YYYY年M月D日 dddd');
            res.json(result);
        } catch (err) {
            console.error(err);
            res.json({});
        }
    })();
};