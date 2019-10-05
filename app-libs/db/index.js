'use strict';

const { getCount, getData, saveData, updateData, } = require('leancloud-db');

module.exports = {
    getCount,
    getData,
    saveData,
    updateData,
    getDbCount: getCount,
    getDbData: getData,
    saveDbData: saveData,
    updateDbData: updateData,
};