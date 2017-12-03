'use strict';
const router = require('express').Router();
const AV = require('leanengine');

const dbName = 'Ele_restaurant';
const Restaurant = AV.Object.extend(dbName);

router.get('/v1/restaurant', (req, res, next) => {
    let query = new AV.Query(Restaurant);
    let limit = req.query.limit || 5;

    query.find().then((results) => {
        let data = [];
        let resultsLength = results.length;

        for (let i = 1; i <= limit; i++) {
            data.push(results[Math.floor(Math.random() * resultsLength)]);
        }

        res.json({
            success: true,
            data: data,
            msg: '查询成功'
        });
    }, () => {
        res.json({
            success: false,
            data: null,
            msg: '查询失败'
        });
    });
});

router.get('/v1/menu/:id', (req, res, next) => {
    res.json({
        a: req.params.id
    });
});

module.exports = router;