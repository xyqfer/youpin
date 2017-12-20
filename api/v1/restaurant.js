'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');

    const dbName = 'Ele_restaurant';
    const Restaurant = AV.Object.extend(dbName);
    let query = new AV.Query(Restaurant);
    let limit = req.query.limit || 5;

    query.limit(2000);

    query.find().then((results) => {
        let data = [];
        let resultsLength = results.length;
        let count = 0;

        while (limit > count) {
            let restaurant = results[Math.floor(Math.random() * resultsLength)];

            if (restaurant.get('rate') >= 4 &&
                !restaurant.get('name').includes('超市') &&
                !restaurant.get('name').includes('商行')) {
                data.push(restaurant);
                count++;
            }
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
};