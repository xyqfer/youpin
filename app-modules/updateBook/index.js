'use strict';

module.exports = async () => {
    const updateDouban = require('./updateDouban');
    const updateChinaPub = require('./updateChinaPub');
    const updateZhongxin = require('./updateZhongxin');

    try {
        await updateDouban();
        await updateZhongxin();
        await updateChinaPub();

        return {
            success: true
        };
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};