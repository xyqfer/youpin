const { getDbData } = require('app-libs/db');

module.exports = async (req, res) => {
    const { token, offset = 0, limit = 50, } = req.query;
    
    if (token !== process.env.NOTES_TOKEN) {
        res.status(400).send('Bad Request');
        return;
    }

    const notes = await getDbData({
        dbName: 'Notes',
        limit,
        query: {
            skip: [offset],
        },
    });

    res.json({
        success: true,
        data: {
            notes,
        },
    });
};