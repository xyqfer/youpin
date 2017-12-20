'use strict';

module.exports = (req, res, next) => {
    const rp = require('request-promise');
    const nodemailer = require('nodemailer');

    const dbName = 'Mi_store';

    function getAllDbData() {
        let query = new AV.Query(dbName);

        query.limit(500);
        return query.find();
    }

    return Promise.all([
        rp.post({
            json: true,
            uri: 'https://shopapi.io.mi.com/app/shopv3/pipe',
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MIOTStore/20170715 (YouPin;1.10.2;5AA7487BD51C5514;20170927100915;I;00000000-0000-0000-0000-000000000000;)',
                'Content-Type': 'application/json'
            },
            body: {
                'BuildHome': {
                    model: 'Homepage',
                    action: 'BuildHome',
                    parameters: {
                        id: 153
                    }
                }
            }
        }),
        getAllDbData()
    ]).then(function (results) {
        const youpinData = results[0].result.BuildHome.data;
        const dbData = results[1];
        const dbDataLength = dbData.length;

        return youpinData.filter((item) => {
            var gid = item.gid;

            for (var i = 0; i < dbDataLength; i++) {
                if (gid == dbData[i].get('gid')) {
                    return false;
                }
            }

            return true;
        });
    }).then(function(data) {
        return Promise.mapSeries(data, function(item) {
            const MiStore = AV.Object.extend(dbName);
            const store = new MiStore();

            store.set('gid', item.gid);
            store.set('url', item.url);
            store.set('name', item.name);

            return rp.post({
                json: true,
                uri: 'https://www.mijiayoupin.com/app/shop/pipe',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60',
                    'Referer': 'https://www.mijiayoupin.com/detail?gid=505'
                },
                form: {
                    data: `{"detail":{"model":"Shopv2","action":"getDetail","parameters":{"gid":"${item.gid}"}},"comment":{"model":"Comment","action":"getList","parameters":{"goods_id":"${item.gid}","orderby":"1","pageindex":"0","pagesize":3}},"activity":{"model":"Activity","action":"getAct","parameters":{"gid":"${item.gid}"}}}`
                }
            }).then((data) => {
                let ctime = data.result.detail.data.good.ctime;

                store.set('createTime', new Date(ctime * 1000));
                store.save(null, {
                    useMasterKey: false
                });
            }).then(function (post) {
                return item;
            }, function (error) {
                // 异常处理
            });
        });
    }).then(function(data) {
        if (data.length > 0) {
            if (process.env.LEANCLOUD_APP_ENV == 'production') {
                let transporter = nodemailer.createTransport({
                    service: 'qq',
                    auth: {
                        user: process.env.mailSender,
                        pass: process.env.mailPass //授权码,通过QQ获取
                    }
                });

                let mailHtml = "";
                data.forEach(function (item) {
                    mailHtml += (`<a href="${item.url}">${item.name}</a><br><br>`);
                });

                const mailOptions = {
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
        res.end();
    });
};

