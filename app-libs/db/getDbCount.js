'use strict';

module.exports = async ({ dbName = '' }) => {
    const AV = require('leanengine');
    const isString = require('lodash/isString');

    if (!isString(dbName) || dbName === '') {
        throw 'dbName 不能为空';
    }

    const q = new AV.Query(dbName);
    return await q.count();
};