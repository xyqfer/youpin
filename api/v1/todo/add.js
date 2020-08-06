const { saveDbData } = require('app-libs/db');

module.exports = async (req, res) => {
    const { text } = req.body;
    const now = Date.now();

    await saveDbData({
        dbName: 'TODO',
        data: [
            {
                text,
                createTime: now,
                updateTime: now
            },
        ],
    });
    res.json({
        success: true,
    });
};
