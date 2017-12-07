'use strict';
const router = require('express').Router();
const AV = require('leanengine');
const rp = require('request-promise');

const dbName = 'Ele_restaurant';
const Restaurant = AV.Object.extend(dbName);

router.get('/v1/restaurant', (req, res, next) => {
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
                    let count = 0;

                    while (limit > count) {
                        let menuItem = data[Math.floor(Math.random() * menuLength)];
                        let foodItem = menuItem.foods[Math.floor(Math.random() * menuItem.foods.length)];

                        if (foodItem.rating >= 4) {
                            menuList.push({
                                name: foodItem.name,
                                rate: foodItem.rating,
                                price: foodItem.specfoods[0].price
                            });

                            count++;
                        }
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

router.get('/v2/menu/:name', (req, res, next) => {
    let name = encodeURIComponent(req.params.name);
    let menuLimt = req.query.menuLimt || 5;
    let restaurantLimit = req.query.restaurantLimit || 5;

    const latitude = process.env.latitude || 30.30489;
    const longitude = process.env.longitude || 120.10598;

    rp.get({
        json: true,
        uri: `https://restapi.ele.me/shopping/v2/restaurants/search?offset=0&limit=20&keyword=${name}&latitude=${latitude}&longitude=${longitude}&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
        }
    }).then((data) => {
        let restaurantList = [];

        try {
            let dataKey = Object.keys(data.inside)[0];

            if (data.inside[dataKey]['restaurant_with_foods'].length > 0) {
                for (let i = 0; i < restaurantLimit; i++) {
                    if (data.inside[dataKey]['restaurant_with_foods'][i] &&
                        data.inside[dataKey]['restaurant_with_foods'][i]['restaurant'].type == 0) {
                        restaurantList.push({
                            id: data.inside[dataKey]['restaurant_with_foods'][i]['restaurant'].id,
                            name: data.inside[dataKey]['restaurant_with_foods'][i]['restaurant'].name
                        });
                    }
                }
            }
        } catch (e) {
            restaurantList = [];
        }

        if (restaurantList.length == 0) {
            res.json({
                success: false,
                data: null,
                msg: '查询失败'
            });

            return 0;
        } else {
            let menuTaskList = restaurantList.map((item) => {
                return Promise.all([
                    item.name,
                    rp.get({
                        json: true,
                        uri: `https://restapi.ele.me/shopping/v2/menu?restaurant_id=${item.id}`,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
                        }
                    })
                ]);
            });

            return Promise.all(menuTaskList);
        }
    }).then((data) => {
        if (data != 0) {
            let result = [];

            data.forEach((item) => {
                let restaurantName = item[0];
                let menuList = item[1];
                let foodList = [];
                let resultList = [];

                menuList.forEach((item) => {
                    item.foods.forEach((food) => {
                        if (food.rating >= 4) {
                            foodList.push({
                                name: food.name,
                                rate: food.rating,
                                price: food.specfoods[0].price
                            });
                        }
                    });
                });

                let foodCount = foodList.length;

                for (let i = 0; i < menuLimt; i++) {
                    let food = foodList[Math.floor(Math.random() * foodCount)];

                    if (food && food.price > 1) {
                        resultList.push(food);
                    }
                }

                result.push({
                    name: restaurantName,
                    menu: resultList
                });
            });

            res.json({
                success: true,
                data: result,
                msg: '查询成功'
            });
        }
    });
});

module.exports = router;