'use strict';

module.exports = (req, res, next) => {
    const rp = require('request-promise');

    let name = encodeURIComponent(req.params.name);
    let menuLimit = req.query.menuLimit || 5;
    let restaurantLimit = req.query.restaurantLimit || 5;

    const latitude = process.env.latitude || 30.30489;
    const longitude = process.env.longitude || 120.10598;
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
        'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60';

    rp.get({
        json: true,
        uri: `https://restapi.ele.me/shopping/v2/restaurants/search?offset=0&limit=20&keyword=${name}&latitude=${latitude}&longitude=${longitude}&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`,
        headers: {
            'User-Agent': ua
        }
    }).then((data) => {
        let resultList = [];

        try {
            for (let key in data.inside) {
                let restaurantWithFoods = data['inside'][key]['restaurant_with_foods'];

                if (restaurantWithFoods.length > 0) {
                    restaurantWithFoods.forEach((item) => {
                        if (resultList.length < restaurantLimit) {
                            if (item && item.restaurant.type == 0) {
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
            }
        } catch (e) {
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