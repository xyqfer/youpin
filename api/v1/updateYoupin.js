'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const sendMail = require('../lib/mail');

    class Youpin {
        constructor() {
            this._dbData = [];
            this._youpinData = [];
            this._newData = [];
            this._dbName = 'Mi_store';
            this._mailTitle = '米家上新品啦';
            this._ua1 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MIOTStore/20170715 ' +
                '(YouPin;1.10.2;5AA7487BD51C5514;20170927100915;I;00000000-0000-0000-0000-000000000000;)';
            this._ua2 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) ' +
                'AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60';
            this._referer = 'https://www.mijiayoupin.com/detail?gid=505';
        }

        async start() {
            this._dbData = await this._getDbData();
            this._youpinData = await this._getYoupinData();
            this._filterYoupinData();
            await this._updateData();
            await this._sendMail();

            this._newData = null;
        }

        _getDbData() {
            let query = new AV.Query(this._dbName);

            query.limit(500);
            return query.find();
        }

        _getYoupinData() {
            return rp.post({
                json: true,
                uri: 'https://shopapi.io.mi.com/app/shopv3/pipe',
                headers: {
                    'User-Agent': this._ua1,
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

        _filterYoupinData() {
            this._newData = this._youpinData.filter((item) => {
                let gid = item.gid;

                for (let i = 0; i < this._dbData.length; i++) {
                    if (gid == this._dbData[i].get('gid')) {
                        return false;
                    }
                }

                return true;
            });

            this._dbData = null;
            this._youpinData = null;
        }

        _updateData() {
            return Promise.mapSeries(this._newData, function(item) {
                const MiStore = AV.Object.extend(this._dbName);
                const store = new MiStore();

                store.set('gid', item.gid);
                store.set('url', item.url);
                store.set('name', item.name);

                return rp.post({
                    json: true,
                    uri: 'https://www.mijiayoupin.com/app/shop/pipe',
                    headers: {
                        'User-Agent': this._ua2,
                        'Referer': this._referer
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

        _sendMail() {
            if (this._newData.length > 0) {
                if (process.env.LEANCLOUD_APP_ENV == 'production') {
                    return sendMail({
                        data: this._newData,
                        title: this._mailTitle
                    });
                } else {
                    console.log(this._newData);
                    return this._newData;
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

