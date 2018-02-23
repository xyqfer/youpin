'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');

    class Ele {
        constructor() {
            this.dbName = 'Ele_restaurant';
            this.ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) ' +
                'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';
            this.latitude = process.env.latitude || 30.30489;
            this.longitude = process.env.longitude || 120.10598;
            this.dbData = [];
            this.eleData = [];
            this.newData = [];
            this.offsetList = [];

            for (let offset = 0; offset <= 500; offset += 20) {
                this.offsetList.push(offset);
            }
        }

        async start() {
            this.dbData = await this.getDbData();
            this.eleData = flatten(await this.getEleData());
            this.filterEleData();
            await this.updateData();
        }

        getDbData() {
            let query = new AV.Query(this.dbName);

            query.limit(2000);
            return query.find();
        }

        getEleData() {
            return Promise.mapSeries(this.offsetList, (offset) => {
                return rp.get({
                    json: true,
                    uri: `https://restapi.ele.me/shopping/restaurants?latitude=${this.latitude}&longitude=${this.longitude}&offset=${offset}&limit=20&extras[]=activities&extras[]=tags&terminal=h5`,
                    headers: {
                        'User-Agent': this.ua,
                    }
                }).then((data) => {
                    return data;
                });
            });
        }

        filterEleData() {
            const dbDataLength = this.dbData.length;

            this.newData = this.eleData.filter((item) => {
                if (item.rating < 4) {
                    return false;
                }

                let discountTip = '';

                for (let i = 0; i < item.activities.length; i++) {
                    if (item.activities[i].type == 102) {
                        discountTip = item.activities[i].tips || '';
                        break;
                    }
                }

                for (let i = 0; i < dbDataLength; i++) {
                    let dbData = this.dbData[i];

                    if (item.id == dbData.get('restaurantId')) {
                        return item.name == dbData.get('name') &&
                            item.rating == dbData.get('rate') &&
                            discountTip == dbData.get('discountTip');
                    }
                }

                return item.type == 0;
            });

            this.dbData = null;
            this.eleData = null;
        }

        updateData() {
            console.log(this.eleData);

            return Promise.mapSeries(this.newData, (item) => {
                const RestaurantStore = AV.Object.extend(this.dbName);
                const store = new RestaurantStore();

                let discountTip = '';

                for (let i = 0; i < item.activities.length; i++) {
                    if (item.activities[i].type == 102) {
                        discountTip = item.activities[i].tips || '';
                        break;
                    }
                }

                store.set('restaurantId', item.id);
                store.set('rate', +item.rating.toFixed(1));
                store.set('name', item.name);
                store.set('discountTip', discountTip);

                return store.save(null, {
                    useMasterKey: false
                }).then((post) => {
                    return item;
                }, (error) => {
                    return error;
                });
            });
        }
    }

    let ele = new Ele();
    ele.start();
    res.end();
};