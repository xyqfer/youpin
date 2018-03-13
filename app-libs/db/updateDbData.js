'use strict';

module.exports = async ({ dbName = 'Text', data = {}, id = '' }) => {
    const AV = require('leanengine');

    try {
        const dbObject = AV.Object.createWithoutData(dbName, id);

        Object.entries(data).forEach(([ key, value]) => {
            dbObject.set(key, value);
        });

        return await dbObject.save();
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};