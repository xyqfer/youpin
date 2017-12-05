'use strict';
const router = require('express').Router();
const AV = require('leanengine');
const rp = require('request-promise');

const dbName = 'Ele_restaurant';
const Restaurant = AV.Object.extend(dbName);

router.get('/v1/restaurant', (req, res, next) => {
    let query = new AV.Query(Restaurant);
    let limit = req.query.limit || 5;

    query.limit(1000);

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

router.get('/v1/menu/:name', (req, res, next) => {
    let query = new AV.Query(Restaurant);
    let limit = req.query.limit || 5;

    query.equalTo('name', req.params.name);

    query.find().then((results) => {
        if (results && results.length > 0) {
            let restaurantId = results[0].get('restaurantId');

            rp.get({
                json: true,
                uri: `https://restapi.ele.me/shopping/v2/menu?restaurant_id=${restaurantId}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
                },
            }).then((data) => {
                if (data && data.length > 0) {
                    let menuList = [];
                    let menuLength = data.length;

                    for (let i = 1; i <= limit; i++) {
                        let menuItem = data[Math.floor(Math.random() * menuLength)];
                        let foodItem = menuItem.foods[Math.floor(Math.random() * menuItem.foods.length)];

                        menuList.push({
                            name: foodItem.name,
                            rate: foodItem.rating,
                            price: foodItem.specfoods[0].price
                        });
                    }

                    res.json({
                        success: true,
                        data: menuList,
                        msg: '查询成功'
                    });
                } else {
                    res.json({
                        success: false,
                        data: null,
                        msg: '查询失败'
                    });
                }
            });
        } else {
            res.json({
                success: false,
                data: null,
                msg: '查询失败'
            });
        }
    });
});

module.exports = router;