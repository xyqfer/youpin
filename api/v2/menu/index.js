'use strict';

module.exports = (req, res, next) => {
    const rp = require('request-promise');
    const { params } = require('app-lib');

    const name = encodeURIComponent(req.params.name);
    const menuLimit = req.query.menuLimit || 5;
    const restaurantLimit = req.query.restaurantLimit || 5;
    const latitude = process.env.latitude || 30.30489;
    const longitude = process.env.longitude || 120.10598;

    rp.get({
        json: true,
        uri: `https://restapi.ele.me/shopping/v2/restaurants/search?offset=0&limit=20&keyword=${name}&latitude=${latitude}&longitude=${longitude}&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`,
        headers: {
            'User-Agent': params.ua.mobile
        }
    }).then((data) => {
        let resultList = [];

        try {
            Object.values(data.inside).forEach((value) => {
                const { restaurant_with_foods: restaurantWithFoods } = value;

                if (restaurantWithFoods.length > 0) {
                    restaurantWithFoods.forEach((item) => {
                        if (resultList.length < restaurantLimit) {
                            if (item && item.restaurant.type === 0) {
                                let menu = [];

                                for (let i = 0; i < menuLimit; i++) {
                                    let food = item.foods[i];

                                    if (food) {
                                        menu.push({
                                            name: food.name,
                                            price: food.price
                                        });
                                    }
                                }

                                if (menu.length > 0) {
                                    resultList.push({
                                        name: item.restaurant.name,
                                        menu: menu
                                    });
                                }
                            }
                        }
                    });
                }
            });
        } catch (err) {
            console.error(err);
            resultList = [];
        }

        if (resultList.length == 0) {
            res.json({
                success: false,
                data: null,
                msg: '查询失败'
            });
        } else {
            res.json({
                success: true,
                data: resultList,
                msg: '查询成功'
            });
        }
    });
};