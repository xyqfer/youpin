'use strict';

module.exports = (req, res, next) => {
    const rp = require('request-promise');
    const Promise = require('bluebird');
    const flatten = require('lodash/flatten');

    const dbName = 'Ele_restaurant';
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
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
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

            let discountTip = '';

            for (let i = 0; i < item.activities.length; i++) {
                if (item.activities[i].type == 102) {
                    discountTip = item.activities[i].tips || '';
                    break;
                }
            }

            for (let i = 0; i < dbDataLength; i++) {
                if (item.id == dbData[i].get('restaurantId')) {
                    return item.name == dbData[i].get('name') &&
                        item.rating == dbData[i].get('rate') &&
                        discountTip == dbData[i].get('discountTip');
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
                    discountTip = item.activities[i].tips || '';
                    break;
                }
            }

            store.set('restaurantId', item.id);
            store.set('rate', item.rating.toFixed(1));
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
    }).then((data) => {
        console.log(data || {});
        res.end();
    });
};