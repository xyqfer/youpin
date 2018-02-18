'use strict';

/**
 * 获取今日状态
 */
module.exports = (req, res) => {
    const AV = require('leanengine');
    const moment = require('moment');

    const dbName = 'DayStatusLog';
    const today = new Date(`${moment().format('YYYY-MM-DD')} 00:00:00`);

    const DailyStatusLog = AV.Object.extend(dbName);
    const query = new AV.Query(DailyStatusLog);

    query.limit(1);
    query.equalTo('time', today);

    query.find().then((result) => {
        if (result.length > 0) {
            return result[0];
        } else {
            const todayStatusLog = new DailyStatusLog();
            todayStatusLog.set('time', today);

            return todayStatusLog.save(null, {
                useMasterKey: false
            }).then(() => {
                return {};
            });
        }
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json([]);
    });
};