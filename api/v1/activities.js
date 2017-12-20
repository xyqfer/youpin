'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');

    const dbName = 'Activities';
    const Activities = AV.Object.extend(dbName);
    let query = new AV.Query(Activities);
    let limit = req.query.limit || 5;

    query.limit(limit);
    query.ascending('startTime');
    query.greaterThanOrEqualTo('endTime', new Date());

    query.find().then((results) => {
        res.json({
            success: true,
            data: results,
            msg: '查询成功'
        });
    }, () => {
        res.json({
            success: false,
            data: null,
            msg: '查询失败'
        });
    });
};