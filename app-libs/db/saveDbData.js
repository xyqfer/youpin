'use strict';

module.exports = ({ dbName = 'Test', data = [] }) => {
    const AV = require('leanengine');

    const DbObject = AV.Object.extend(dbName);
    const dbObjectList = data.map((item) => {
        const dbObject = new DbObject();

        Object.entries(item).forEach(([ key, value ]) => {
            dbObject.set(key, value);
        });

        return dbObject;
    });

    return AV.Object.saveAll(dbObjectList).then((results) => {
        return results;
    }).catch((err) => {
        console.error(err);
        return [];
    });
};