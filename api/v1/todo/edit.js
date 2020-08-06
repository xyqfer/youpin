const { updateData } = require('app-libs/db');

module.exports = async (req, res) => {
    const { id, text } = req.body;
    const now = Date.now();

    await updateData({
        dbName: 'TODO',
        id,
        data: {
            text,
            updateTime: now
        },
    });
    res.json({
        success: true,
    });
};
