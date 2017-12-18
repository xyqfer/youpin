var AV = require("leanengine");

AV.Cloud.define("youpin_1", function(request) {
    var rp = require('request-promise');
    var Promise = require("bluebird");
    var nodemailer = require('nodemailer');

    var dbName = "Mi_store";

    function getAllDbData() {
        var query = new AV.Query(dbName);

        query.limit(500);
        return query.find();
    }

    return Promise.all([
        rp.post({
            json: true,
            uri: "https://shopapi.io.mi.com/app/shopv3/pipe",
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MIOTStore/20170715 (YouPin;1.10.2;5AA7487BD51C5514;20170927100915;I;00000000-0000-0000-0000-000000000000;)',
                'Content-Type': 'application/json'
            },
            body: {"BuildHome":{"model":"Homepage","action":"BuildHome","parameters":{"id":153}}}
        }),
        getAllDbData()
    ]).then(function (results) {
        var youpinData = results[0].result.BuildHome.data;
        var dbData = results[1];
        var dbDataLength = dbData.length;

        return youpinData.filter((item) => {
            var gid = item.gid;

            for (var i = 0; i < dbDataLength; i++) {
                if (gid == dbData[i].get("gid")) {
                    return false;
                }
            }

            return true;
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

    let offsetList = [];

    for (let offset = 0; offset <= 500; offset += 20) {
        offsetList.push(offset);
    }

    function getAllDbData() {
        let query = new AV.Query(dbName);

        query.limit(2000);
        return query.find();
    }

    return Promise.all([
        Promise.mapSeries(offsetList, (offset) => {
            return rp.get({
                json: true,
                uri: `https://restapi.ele.me/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=20&extras[]=activities&extras[]=tags&terminal=h5`,
                headers: {
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
                }
            }).then((data) => {
                return data;
            });
        }),
        getAllDbData()
    ]).then((results) => {
        let eleData = flatten(results[0]);
        let dbData = results[1];
        const dbDataLength = dbData.length;

        return eleData.filter((item) => {
            if (item.rating < 4) {
                return false;
            }

            let discountTip = "";

            for (let i = 0; i < item.activities.length; i++) {
                if (item.activities[i].type == 102) {
                    discountTip = item.activities[i].tips || "";
                    break;
                }
            }

            for (let i = 0; i < dbDataLength; i++) {
                if (item.id == dbData[i].get("restaurantId")) {
                    return item.name == dbData[i].get("name") &&
                        item.rating == dbData[i].get("rate") &&
                        discountTip == dbData[i].get("discountTip");
                }
            }

            return item.type == 0;
        });
    }).then((data) => {
        return Promise.mapSeries(data, (item) => {
            const RestaurantStore = AV.Object.extend(dbName);
            const store = new RestaurantStore();

            let discountTip = "";

            for (let i = 0; i < item.activities.length; i++) {
                if (item.activities[i].type == 102) {
                    discountTip = item.activities[i].tips || "";
                    break;
                }
            }

            store.set("restaurantId", item.id);
            store.set("rate", item.rating.toFix(1));
            store.set("name", item.name);
            store.set("discountTip", discountTip);

            return store.save(null, {
                useMasterKey: false
            }).then((post) => {
                return item;
            }, (error) => {
                return error;
            });
        });
    }).then((data) => {
        return data || {};
    });
});