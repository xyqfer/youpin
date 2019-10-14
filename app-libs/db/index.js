'use strict';

const { getCount, getData, saveData, updateData, updateData2, setHook, syncEnv, cache } = require('@xyqfer/leancloud-db');

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
    updateData2,
    syncEnv,
    cache,
};
