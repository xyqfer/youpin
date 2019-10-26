'use strict';

module.exports = async () => {
    const updateDouban = require('./updateDouban');
    const updateChinaPub = require('./updateChinaPub');
    const updateIturing = require('./updateIturing');
    const updateEpubit = require('./updateEpubit');
    const updateBroadview = require('./updateBroadview');
    const updateDangdang = require('./updateDangdang');
    const updateKobo = require('./updateKobo');

    try {
        await updateDouban();
        await updateChinaPub();
        await updateIturing();
        await updateEpubit();
        await updateBroadview();
        await updateDangdang();
        await updateKobo();

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
