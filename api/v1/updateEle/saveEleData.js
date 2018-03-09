'use strict';

module.exports = ({ dbName = 'Test', data = [] }) => {
    const { saveDbData } = require('app-lib/db');

    const saveData = data.map((item) => {
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

    saveDbData({
        dbName,
        data: saveData
    });
};
