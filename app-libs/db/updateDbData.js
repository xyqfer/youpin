'use strict';

module.exports = async ({ dbName = '', data = {}, id = '' }) => {
    const AV = require('leanengine');
    const isString = require('lodash/isString');
    const isObject = require('lodash/isObject');
    const params = require('../params');

    if (!isString(dbName) || dbName === '') {
        throw 'dbName 不能为空';
    }


    if (!isObject(data)) {
        throw 'data 不能为空';
    }

    if (!isString(id) || id === '') {
        throw 'id 不能为空';
    }

    if (params.env.isDev) {
        return data;
    }

    const dbObject = AV.Object.createWithoutData(dbName, id);

    Object.entries(data).forEach(([ key, value ]) => {
        dbObject.set(key, value);
    });

    const result = await dbObject.save();
    return result.toJSON();
};