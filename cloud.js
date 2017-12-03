var AV = require("leanengine");

AV.Cloud.define("youpin_1", function(request) {
    var rp = require('request-promise');
    var Promise = require("bluebird");
    var nodemailer = require('nodemailer');

    var dbName = "Mi_store";

    return rp.post({
        json: true,
        uri: "https://shopapi.io.mi.com/app/shopv3/pipe",
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MIOTStore/20170715 (YouPin;1.10.2;5AA7487BD51C5514;20170927100915;I;00000000-0000-0000-0000-000000000000;)',
            'Content-Type': 'application/json'
        },
        body: {"BuildHome":{"model":"Homepage","action":"BuildHome","parameters":{"id":153}}}
    }).then(function(results) {
        var data = results.result.BuildHome.data;

        if (process.env.LEANCLOUD_APP_ENV != "production") {
            console.log(data);
        }

        return Promise.filter(data, function (item) {
            var query = new AV.Query(dbName);
            query.equalTo('gid', item.gid);

            return query.find().then(function(results) {
                if (results.length == 0) {
                    return true;
                } else {
                    return false;
                }
            });
        }, {
            concurrency: 1
        });
    }).then(function(data) {
        return Promise.mapSeries(data, function(item) {
            var MiStore = AV.Object.extend(dbName);
            var store = new MiStore();
            store.set('gid', item.gid);
            store.set('url', item.url);
            store.set('name', item.name);

            return store.save(null, { useMasterKey: false }).then(function (post) {
                return item;
            }, function (error) {
                // 异常处理
            });
        });
    }).then(function(data) {
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
                    mailHtml += ("<a href='" + item.url + "'>" + item.name + "</a>" + "<br><br>");
                });

                var mailOptions = {
                    from: process.env.mailSender, // 发送者
                    to: process.env.mailReceivers, // 接受者,可以同时发送多个,以逗号隔开
                    subject: '米家上新品啦', // 标题
                    html: mailHtml
                };

                return transporter.sendMail(mailOptions);
            } else {
                console.log(data);
                return data;
            }
        } else {
            return {};
        }
    }).then(function(data) {
        console.log(data);
        return data;
    });
});

AV.Cloud.define("ele_restaurant", function (request) {
    const rp = require("request-promise");
    const Promise = require("bluebird");
    const flatten = require("lodash/flatten");

    const dbName = "Ele_restaurant";
    const latitude = process.env.latitude || 30.30489;
    const longitude = process.env.longitude || 120.10598;
    const offsetList = [];

    for (let offset = 0; offset <= 500; offset += 20) {
        offsetList.push(offset);
    }

    return Promise.mapSeries(offsetList, (offset) => {
        return rp.get({
            json: true,
            uri: `https://restapi.ele.me/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=20&terminal=h5`,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60"
            }
        }).then((data) => {
            return data;
        });
    }).then((data) => {
        return flatten(data);
    }).then((results) => {
        return Promise.filter(results, (item) => {
            const query = new AV.Query(dbName);
            query.equalTo("restaurantId", item.id);

            return query.find().then((results) => {
                return results.length == 0;
            });
        }, {
            concurrency: 1
        });
    }).then((data) => {
        console.log(data);

        return Promise.mapSeries(data, (item) => {
            const RestaurantStore = AV.Object.extend(dbName);
            const store = new RestaurantStore();

            store.set("restaurantId", item.id);
            store.set("rate", item.rating);
            store.set("name", item.name);

            return store.save(null, {
                useMasterKey: false
            }).then((post) => {
                return item;
            }, (error) => {
                return error;
            });
        });
    });
});