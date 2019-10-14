'use strict';

module.exports = async ({ dbName = 'Test', data = [] }) => {
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
            discountTip: discountTip,
        };
    });

    try {
        const saveData = [];

        for (let i = 0; i < rawSaveData.length; i++) {
            const item = rawSaveData[i];
            const dbItem = await getDbData({
                dbName,
                limit: 1,
                query: {
                    equalTo: ['restaurantId', item.restaurantId],
                },
            });

            if (dbItem.length === 0) {
                saveData.push(item);
            }
        }

        await saveDbData({
            dbName,
            data: saveData,
        });

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
