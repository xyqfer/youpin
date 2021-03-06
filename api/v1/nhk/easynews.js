'use strict';

const { getDbData } = require('app-libs/db');

module.exports = async (req, res) => {
    const { offset = 0, limit = 20 } = req.query;
    const dbName = 'NHKEasyNews';

    try {
        const data = await getDbData({
            dbName,
            limit,
            query: {
                skip: [offset],
                descending: ['createdAt'],
                select: ['title', 'cover'],
            },
        });

        const list = data.map((item) => {
            const cover = item.cover;

            if (cover) {
                item.cover = process.env.IMAGE_PROXY + cover;
            }
            return item;
        });

        res.json({
            success: true,
            data: {
                list,
            },
        });
    } catch (err) {
        console.error(err);
        res.json({});
    }
};
