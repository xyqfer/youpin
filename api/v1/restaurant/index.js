'use strict';

module.exports = (req, res) => {
    const { getDbData } = require('app-libs/db');

    (async () => {
        try {
            const dbName = 'Ele_restaurant';
            const limit = +(req.query.limit || 5);

            const dbData = await getDbData({
                dbName,
            });

            const data = [];
            const dbDataCount = dbData.length;
            let count = 0;

            while (limit > count) {
                const restaurant = dbData[Math.floor(Math.random() * dbDataCount)];

                if (restaurant.rate >= 4 && !restaurant.name.includes('超市') && !restaurant.name.includes('商行')) {
                    const idx = data.findIndex((item) => item.restaurantId === restaurant.restaurantId);

                    if (idx === -1) {
                        data.push(restaurant);
                        count++;
                    }
                }
            }

            res.json({
                success: true,
                data: data,
                msg: '查询成功',
            });
        } catch (err) {
            console.error(err);
            res.json({
                success: false,
                data: null,
                msg: '查询失败',
            });
        }
    })();
};
