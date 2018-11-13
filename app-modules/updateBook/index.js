'use strict';

module.exports = async () => {
    const updateDouban = require('./updateDouban');
    const updateChinaPub = require('./updateChinaPub');
    const updateZhongxin = require('./updateZhongxin');
    const updateZhanlu = require('./updateZhanlu');
    const updateIturing = require('./updateIturing');
    const updateEpubit = require('./updateEpubit');
    const updateBroadview = require('./updateBroadview');
    const updateWeibo = require('./updateWeibo');
    const updateZhihu = require('./updateZhihu');

    try {
        await updateDouban();
        await updateZhongxin();
        await updateChinaPub();
        await updateZhanlu();
        await updateIturing();
        await updateEpubit();
        await updateBroadview();
        await updateWeibo();
        await updateZhihu();

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