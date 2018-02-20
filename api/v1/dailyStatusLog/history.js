'use strict';

/**
 * 获取历史状态
 */
module.exports = (req, res) => {
    const AV = require('leanengine');

    const dbName = 'DayStatusLog';
    const DailyStatusLog = AV.Object.extend(dbName);
    const query = new AV.Query(DailyStatusLog);
    const days = +(req.params.days || 1);

    query.limit(days);
    query.ascending('time');
    query.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json([]);
    });
};