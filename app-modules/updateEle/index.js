'use strict';

module.exports = () => {
    const getEleData = require('./getEleData');
    const saveEleData = require('./saveEleData');
    const {
        db: {
            getDbData,
        },
        params
    } = require('app-lib');

    const dbName = 'Ele_restaurant';
    const offsets = [];

    for (let offset = 0; offset <= 500; offset += 20) {
        offsets.push(offset);
    }

    const latitude = process.env.latitude || 30.30489;
    const longitude = process.env.longitude || 120.10598;

    return Promise.all([
        getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        }),
        getEleData({
            offsets,
            latitude,
            longitude
        })
    ]).then(([dbData, eleData]) => {
        const newData = eleData.filter((item) => {
            if (item.rating < 4) {
                return false;
            }

            let discountTip = '';

            for (let i = 0; i < item.activities.length; i++) {
                if (item.activities[i].type === 102) {
                    discountTip = item.activities[i].tips || '';
                    break;
                }
            }

            for (let i = 0; i < dbData.length; i++) {
                const dbItem = dbData[i];

                if (item.id === dbItem.restaurantId) {
                    return item.name === dbItem.name &&
                        item.rating === dbItem.rate &&
                        discountTip === dbItem.discountTip;
                }
            }

            return item.type === 0;
        });

        if (newData.length > 0 && !params.env.isDev) {
            saveEleData({
                dbName,
                data: newData
            });
        }

        return newData;
    }).catch((err) => {
        console.error(err);
        return [];
    });
};