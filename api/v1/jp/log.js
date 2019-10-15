const { saveData } = require('app-libs/db');

module.exports = async (req, res) => {
    const { count } = req.body;
    await saveData({
        dbName: 'JP_LOG',
        data: [
            {
                count,
            },
        ],
    });
    res.json({
        success: true,
    });
};
