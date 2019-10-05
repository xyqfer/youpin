const { saveDbData } = require('app-libs/db');

module.exports = async (req, res) => {
    const { token, message } = req.body;
    
    if (token !== process.env.NOTES_TOKEN) {
        res.status(400).send('Bad Request');
        return;
    }

    await saveDbData({
        dbName: 'Notes',
        data: [{
            message,
        }],
    });
    res.json({
        success: true,
    });
};