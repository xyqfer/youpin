'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const sendMail = require('../lib/mail');

    class Youpin {
        constructor() {
            console.log('updateYoupin');

            this.dbData = [];
            this.youpinData = [];
            this.newData = [];
            this.dbName = 'Mi_store';
            this.mailTitle = '米家上新品啦';
            this.ua1 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MIOTStore/20170715 ' +
                '(YouPin;1.10.2;5AA7487BD51C5514;20170927100915;I;00000000-0000-0000-0000-000000000000;)';
            this.ua2 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60';
            this.referer = 'https://www.mijiayoupin.com/detail?gid=505';
        }

        async start() {
            this.dbData = await this.getDbData();
            this.youpinData = await this.getYoupinData();
            this.filterYoupinData();
            await this.updateData();
            await this.sendMail();

            this.newData = null;
        }

        getDbData() {
            let query = new AV.Query(this.dbName);

            query.limit(500);
            return query.find();
        }

        getYoupinData() {
            return rp.post({
                json: true,
                uri: 'https://shopapi.io.mi.com/app/shopv3/pipe',
                headers: {
                    'User-Agent': this.ua1,
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
            }).then((data) => {
                return data.result.BuildHome.data;
            })
        }

        filterYoupinData() {
            this.newData = this.youpinData.filter((item) => {
                let gid = item.gid;

                for (let i = 0; i < this.dbData.length; i++) {
                    if (gid == this.dbData[i].get('gid')) {
                        return false;
                    }
                }

                return true;
            });

            this.dbData = null;
            this.youpinData = null;
        }

        updateData() {
            console.log('updateYoupin');

            return Promise.mapSeries(this.newData, function(item) {
                const MiStore = AV.Object.extend(this.dbName);
                const store = new MiStore();

                store.set('gid', item.gid);
                store.set('url', item.url);
                store.set('name', item.name);

                return rp.post({
                    json: true,
                    uri: 'https://www.mijiayoupin.com/app/shop/pipe',
                    headers: {
                        'User-Agent': this.ua2,
                        'Referer': this.referer
                    },
                    form: {
                        data: `{"detail":{"model":"Shopv2","action":"getDetail","parameters":{"gid":"${item.gid}"}},"comment":{"model":"Comment","action":"getList","parameters":{"goods_id":"${item.gid}","orderby":"1","pageindex":"0","pagesize":3}},"activity":{"model":"Activity","action":"getAct","parameters":{"gid":"${item.gid}"}}}`
                    }
                }).then((data) => {
                    let ctime = data.result.detail.data.good.ctime; // 创建时间

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
        }

        sendMail() {
            if (this.newData.length > 0) {
                if (process.env.LEANCLOUD_APP_ENV == 'production') {
                    let mailContent = '';

                    this.newData.forEach((item) => {
                        mailContent += `<a href='${item.url}'>${item.name}</a><br><br>`;
                    });

                    return sendMail({
                        title: this.mailTitle,
                        mailContent: mailContent
                    });
                } else {
                    return this.newData;
                }
            } else {
                return {};
            }
        }
    }

    let youpin = new Youpin();
    youpin.start();
    res.end();
};

