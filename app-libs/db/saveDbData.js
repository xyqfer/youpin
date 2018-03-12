'use strict';

module.exports = async ({ dbName = 'Test', data = [] }) => {
    const AV = require('leanengine');

    try {
        const DbObject = AV.Object.extend(dbName);
        const dbObjectList = data.map((item) => {
            const dbObject = new DbObject();

            Object.entries(item).forEach(([ key, value ]) => {
                dbObject.set(key, value);
            });

            return dbObject;
        });

        return await AV.Object.saveAll(dbObjectList);
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};