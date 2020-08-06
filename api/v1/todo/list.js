const { getDbData } = require('app-libs/db');

module.exports = async (req, res) => {
    const { offset = 0, limit = 50 } = req.query;

    const list = await getDbData({
        dbName: 'TODO',
        limit,
        query: {
            skip: [offset],
        },
    });

    res.json({
        success: true,
        data: {
            list,
        },
    });
};
