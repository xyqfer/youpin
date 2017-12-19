'use strict';
const router = require('express').Router();
const AV = require('leanengine');
const rp = require('request-promise');

router.get('/v1/restaurant', (req, res, next) => {
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
});

router.get('/v1/menu/:name', (req, res, next) => {
    const dbName = 'Ele_restaurant';
    const Restaurant = AV.Object.extend(dbName);
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
    let menuLimit = req.query.menuLimit || 5;
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
            for (let key in data.inside) {
                let restaurantWithFoods = data['inside'][key]['restaurant_with_foods'];

                if (restaurantWithFoods.length > 0) {
                    restaurantWithFoods.forEach((item) => {
                        if (restaurantList.length < restaurantLimit) {
                            if (item && item.restaurant.type == 0) {
                                restaurantList.push({
                                    id: item.restaurant.id,
                                    name: item.restaurant.name
                                });
                            }
                        }
                    });
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

                if (menuList.length > 0 &&
                    menuList[0]['id'] == -1 &&
                    menuList[0]['type'] == 2) {
                    menuList[0]['foods'].forEach((food) => {
                        if (food.rating >= 4 && food.specfoods[0].price > 1) {
                            foodList.push({
                                name: food.name,
                                rate: food.rating,
                                price: food.specfoods[0].price.toFixed(1)
                            });
                        }
                    });
                } else {
                    menuList.forEach((item) => {
                        item.foods.forEach((food) => {
                            if (food.rating >= 4 && food.specfoods[0].price > 1) {
                                foodList.push({
                                    name: food.name,
                                    rate: food.rating,
                                    price: food.specfoods[0].price.toFixed(1)
                                });
                            }
                        });
                    });
                }

                if (foodList.length <= menuLimit) {
                    resultList = foodList;
                } else {
                    for (let i = 0; i < menuLimit; i++) {
                        let randomIndex = Math.floor(Math.random() * foodList.length);
                        let food = foodList.splice(randomIndex, 1);

                        if (food.length > 0) {
                            resultList.push(food[0]);
                        }
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

router.get('/v1/activities', (req, res, next) => {
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
});

router.get('/v1/books/update', (req, res, next) => {
    var rp = require('request-promise');
    var Promise = require("bluebird");
    var nodemailer = require('nodemailer');
    var cheerio = require('cheerio');
    var iconv = require('iconv-lite');
    const flatten = require("lodash/flatten");

    function updateChinaPubBook() {
        var dbName = "ChinaPubBooks";

        function getAllDbData() {
            var query = new AV.Query(dbName);

            query.limit(1000);
            return query.find();
        }

        function getBookData() {
            return rp.get({
                uri: 'http://www.china-pub.com/xinshu/',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
                }
            }).then((htmlString) => {
                var $ = cheerio.load(htmlString);
                var targetUrlList = [];

                $('.nb_sec1').each(function () {
                    targetUrlList.push($(this).find('.nb_sec1_left h1 a').attr('href'));
                });

                return Promise.map(targetUrlList, (url) => {
                    return rp.get({
                        uri: url,
                        encoding : null,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
                        }
                    });
                });

            }).then((result) => {
                var bookList = [];

                result.forEach((htmlString) => {
                    var $ = cheerio.load(iconv.decode(htmlString, 'gb2312'));

                    $('.bookshow').each(function () {
                        bookList.push({
                            name: $(this).find('.bookName a').attr('title'),
                            url: $(this).find('.bookName a').attr('href')
                        });
                    });
                });

                return bookList;
            });
        }

        return Promise.all([
            getAllDbData(),
            getBookData()
        ]).then((data) => {
            var dbData = data[0];
            var booksData = data[1];

            return booksData.filter((book) => {
                var sameBook = dbData.filter((item) => {
                    return item.get('url') == book.url;
                });

                return sameBook.length == 0;
            });
        }).then((data) => {
            return Promise.mapSeries(data, (item) => {
                var BookStore = AV.Object.extend(dbName);
                var store = new BookStore();

                store.set('name', item.name);
                store.set('url', item.url);

                return store.save(null, {
                    useMasterKey: false
                }).then(function (post) {
                    return item;
                }, function (error) {
                    // 异常处理
                });
            });
        });
    }

    Promise.all([
        updateChinaPubBook()
    ]).then((data) => {
        res.end();
    });
});

router.get('/v1/books/notify', (req, res, next) => {
    var dbName = "ChinaPubBooks";
    var query = new AV.Query(dbName);

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    var date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

    query.greaterThanOrEqualTo("updatedAt", new Date(`${year}-${month}-${date} 00:00:00`));

    query.limit(1000);
    query.find().then((data) => {
       if (data.length > 0) {
           if (process.env.LEANCLOUD_APP_ENV == "production") {
               var transporter = nodemailer.createTransport({
                   service: 'qq',
                   auth: {
                       user: process.env.mailSender,
                       pass: process.env.mailPass //授权码,通过QQ获取
                   }
               });

               var mailHtml = "";
               data.forEach(function (item) {
                   mailHtml += ("<a href='" + item.get("url") + "'>" + item.get("name") + "</a>" + "<br><br>");
               });

               var mailOptions = {
                   from: process.env.mailSender, // 发送者
                   to: process.env.mailReceivers, // 接受者,可以同时发送多个,以逗号隔开
                   subject: '有新书啦', // 标题
                   html: mailHtml
               };

               return transporter.sendMail(mailOptions);
           } else {
               console.log(data);
               return data;
           }
       }
    }).then((data) => {
        res.end();
    });
});

module.exports = router;