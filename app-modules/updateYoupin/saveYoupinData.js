'use strict';

module.exports = async ({ data = [], dbName = '' }) => {
    const {
        db: {
            saveDbData
        },
    } = require('app-libs');

    try {        
        await saveDbData({
            dbName,
            data,
        });

        return {
            success: true
        };
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};
