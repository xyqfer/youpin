'use strict';

/**
 * 获取历史状态
 */
module.exports = (req, res) => {
    const AV = require('leanengine');
    const moment = require('moment');

    const dbName = 'DayStatusLog';
    const DailyStatusLog = AV.Object.extend(dbName);
    const query = new AV.Query(DailyStatusLog);
    const days = +(req.params.days || 1);

    query.limit(days);
    query.ascending('time');
    query.find().then((data) => {
        const result = data.map((item) => {
            const time = moment(item.get('time')).format('YYYY-MM-DD');
            item.set('time', time);

            return item;
        });

        res.json(result);
    }).catch((err) => {
        res.json([]);
    });
};