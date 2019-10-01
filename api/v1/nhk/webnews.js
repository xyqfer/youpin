'use strict';

const { getDbData } = require('app-libs/db');

module.exports = async (req, res) => {
    const { offset = 0, limit = 20, } = req.query;
    const dbName = 'NHKWebNews';

    try {
        let data = await getDbData({
            dbName,
            limit,
            query: {
                skip: [offset],
                descending: ['createdAt'],
                select: ['title'],
            },
        });

        res.json({
            success: true,
            data: {
                list: data,
            },
        });
    } catch (err) {
        console.error(err);
        res.json({});
    }
};