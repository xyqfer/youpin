'use strict';
const { db, } = require('app-libs');

module.exports = async (req, res) => {
    const { id, } = req.params;
    const dbName = 'NHKWebNews';

    try {
        const [ data ] = await db.getDbData({
            dbName,
            limit: 1,
            query: {
                equalTo: ['objectId', id],
            },
        });
        const { title, htmlContent, wordList, } = data;

        res.json({
            success: true,
            data: {
                title, 
                htmlContent, 
                wordList,
            },
        });
    } catch (err) {
        console.error(err);
        res.json({});
    }
};