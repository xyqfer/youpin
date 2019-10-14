'use strict';

/**
 * 获取历史状态
 */
module.exports = (req, res) => {
    const moment = require('moment');
    const { getDbData } = require('app-libs/db');

    const dbName = 'DayStatusLog';
    const limit = +(req.params.days || 1);

    (async () => {
        try {
            const data = await getDbData({
                dbName,
                limit,
                query: {
                    descending: ['time'],
                },
            });

            const result = data.map((item) => {
                const time = moment(item.time).format('YYYY-MM-DD');
                item.time = time;

                return item;
            });

            res.json(result.reverse());
        } catch (err) {
            console.error(err);
            res.json([]);
        }
    })();
};
