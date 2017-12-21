'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');

    class Ele {
        constructor() {
            this._dbName = 'Ele_restaurant';
            this._latitude = process.env.latitude || 30.30489;
            this._longitude = process.env.longitude || 120.10598;
            this._dbData = [];
            this._eleData = [];
            this._newData = [];
            this._offsetList = [];

            for (let offset = 0; offset <= 500; offset += 20) {
                this._offsetList.push(offset);
            }
        }

        async start() {
            this._dbData = await this._getDbData();
            this._eleData = flatten(await this._getEleData());
            this._filterEleData();
            await this._updateData();
        }

        _getDbData() {
            let query = new AV.Query(this._dbName);

            query.limit(2000);
            return query.find();
        }

        _getEleData() {
            return Promise.mapSeries(this._offsetList, (offset) => {
                return rp.get({
                    json: true,
                    uri: `https://restapi.ele.me/shopping/restaurants?latitude=${this._latitude}&longitude=${this._longitude}&offset=${offset}&limit=20&extras[]=activities&extras[]=tags&terminal=h5`,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
                    }
                }).then((data) => {
                    return data;
                });
            });
        }

        _filterEleData() {
            const dbDataLength = this._dbData.length;

            this._newData = this._eleData.filter((item) => {
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
                    let dbData = this._dbData[i];

                    if (item.id == dbData.get('restaurantId')) {
                        return item.name == dbData.get('name') &&
                            item.rating == dbData.get('rate') &&
                            discountTip == dbData.get('discountTip');
                    }
                }

                return item.type == 0;
            });

            this._dbData = null;
            this._eleData = null;
        }

        _updateData() {
            return Promise.mapSeries(this._newData, (item) => {
                const RestaurantStore = AV.Object.extend(this._dbName);
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