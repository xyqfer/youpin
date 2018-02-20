'use strict';

/**
 * 更新今日状态
 */
module.exports = (req, res) => {
    const AV = require('leanengine');
    const moment = require('moment');

    const dbName = 'DayStatusLog';
    const today = new Date(`${moment().format('YYYY-MM-DD')} 00:00:00`);
    const todayStatusLog = req.body.today;

    const DailyStatusLog = AV.Object.extend(dbName);
    const query = new AV.Query(DailyStatusLog);

    query.limit(1);
    query.equalTo('time', today);
    query.find().then((result) => {
        if (result.length > 0) {
            const id = result[0].id;
            const statusLog = AV.Object.createWithoutData(dbName, id);

            statusLog.set('morningStatus', todayStatusLog.morningStatus);
            statusLog.set('morningStatusText', todayStatusLog.morningStatusText);
            statusLog.set('afternoonStatus', todayStatusLog.afternoonStatus);
            statusLog.set('afternoonStatusText', todayStatusLog.afternoonStatusText);
            statusLog.set('eveningStatus', todayStatusLog.eveningStatus);
            statusLog.set('eveningStatusText', todayStatusLog.eveningStatusText);

            return statusLog.save();
        } else {
            throw 'something error!';
        }
    }).then((result) => {
        res.json({
            success: true
        });
    }).catch((err) => {
        res.json({});
    });
};