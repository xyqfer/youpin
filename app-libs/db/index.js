'use strict';

const { getCount, getData, saveData, updateData, setHook, } = require('leancloud-db');

module.exports = {
    getCount,
    getData,
    saveData,
    updateData,
    setHook,
    getDbCount: getCount,
    getDbData: getData,
    saveDbData: saveData,
    updateDbData: updateData,
};