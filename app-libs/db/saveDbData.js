'use strict';

module.exports = async ({ dbName = '', data = [] }) => {
    const AV = require('leanengine');
    const isString = require('lodash/isString');
    const isObject = require('lodash/isObject');

    if (!isString(dbName) || dbName === '') {
        throw 'dbName 不能为空';
    }

    const DbObject = AV.Object.extend(dbName);
    const dbObjectList = data.map((item) => {
        const dbObject = new DbObject();

        Object.entries(item).forEach(([ key, value ]) => {
            dbObject.set(key, value);
        });

        return dbObject;
    });

    const results = await AV.Object.saveAll(dbObjectList);

    return results.map((item) => {
        return item.toJSON();
    });
};