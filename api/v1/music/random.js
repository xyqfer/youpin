'use strict';
const { db } = require('app-libs');

module.exports = async (req, res) => {
    const dbName = 'Music';
    const limit = 1;

    const count = await db.getDbCount({
        dbName,
    });
    const index = Math.floor(Math.random() * count + 1);
    const data = await db.getDbData({
        dbName,
        limit,
        query: {
            skip: [index],
        },
    });

    res.json({
        data,
    });
};
