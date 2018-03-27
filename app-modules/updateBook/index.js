'use strict';

module.exports = async () => {
    const updateDouban = require('./updateDouban');
    const updateChinaPub = require('./updateChinaPub');
    const updateZhongxin = require('./updateZhongxin');
    const updateZhanlu = require('./updateZhanlu');
    const updateIturing = require('./updateIturing');

    try {
        await updateDouban();
        await updateZhongxin();
        await updateChinaPub();
        await updateZhanlu();
        await updateIturing();

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