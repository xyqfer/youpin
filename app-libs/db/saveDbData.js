'use strict';

module.exports = async ({ dbName = '', data = [] }) => {
    const AV = require('leanengine');
    const isString = require('lodash/isString');
    const params = require('../params');

    if (!isString(dbName) || dbName === '') {
        throw 'dbName 不能为空';
    }

    if (params.env.isDev) {
        return data;
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