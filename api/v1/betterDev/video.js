'use strict';

module.exports = async (req, res) => {
    const { getDbData } = require('app-libs/db');
    const dbName = 'BetterDevVideo';

    try {
        const data = await getDbData({
            dbName,
        });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.json([]);
    }
};