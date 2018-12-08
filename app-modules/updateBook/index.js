'use strict';

module.exports = async () => {
    const updateDouban = require('./updateDouban');
    const updateChinaPub = require('./updateChinaPub');
    const updateYouzan = require('./updateYouzan');
    const updateZhanlu = require('./updateZhanlu');
    const updateIturing = require('./updateIturing');
    const updateEpubit = require('./updateEpubit');
    const updateBroadview = require('./updateBroadview');
    const updateWeibo = require('./updateWeibo');
    const updateZhihu = require('./updateZhihu');
    const updatePtpress = require('./updatePtpress');
    const updateDangdang = require('./updateDangdang');

    try {
        await updateDouban();
        await updateYouzan();
        await updateChinaPub();
        await updateZhanlu();
        await updateIturing();
        await updateEpubit();
        await updateBroadview();
        await updateWeibo();
        await updateZhihu();
        await updatePtpress();
        await updateDangdang();

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