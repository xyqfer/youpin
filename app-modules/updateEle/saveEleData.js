'use strict';

module.exports = ({ dbName = 'Test', data = [] }) => {
    const { getDbData, saveDbData } = require('app-libs/db');

    const rawSaveData = data.map((item) => {
        let discountTip = '';

        for (let i = 0; i < item.activities.length; i++) {
            if (item.activities[i].type === 102) {
                discountTip = item.activities[i].tips || '';
                break;
            }
        }

        return {
            restaurantId: item.id,
            rate: +item.rating.toFixed(1),
            name: item.name,
            discountTip: discountTip
        };
    });

    (async () => {
        const saveData = [];

        for (let i = 0; i < rawSaveData.length; i++) {
            const item = rawSaveData[i];
            const dbItem = await getDbData({
                dbName,
                limit: 1,
                query: {
                    equalTo: ['restaurantId', item.restaurantId]
                }
            });

            if (dbItem.length === 0) {
                saveData.push(item);
            }
        }

        saveDbData({
            dbName,
            data: saveData
        });
    })();
};
