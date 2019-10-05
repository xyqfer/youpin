'use strict';

const { getCount, getData, saveData, updateData, setHook, } = require('@xyqfer/leancloud-db');

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