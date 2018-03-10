'use strict';

module.exports = (req, res, next) => {
    const getEleData = require('./getEleData');
    const saveEleData = require('./saveEleData');
    const {
        db: {
            getDbData,
        },
        params
    } = require('app-lib');

    (async () => {
        const dbName = 'Ele_restaurant';
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });

        const offsets = [];

        for (let offset = 0; offset <= 500; offset += 20) {
            offsets.push(offset);
        }

        const latitude = process.env.latitude || 30.30489;
        const longitude = process.env.longitude || 120.10598;

        const eleData = await getEleData({
            offsets,
            latitude,
            longitude
        });

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
    })();

    res.end();
};