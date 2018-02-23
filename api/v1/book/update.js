'use strict';

module.exports = () => {
    const updateDouban = require('./_updateDouban');
    const updateChinaPub = require('./_updateChinaPub');
    const updateZhongxin = require('./_updateZhongxin');

    return updateDouban().then(() => {
        return updateZhongxin();
    }).then(() => {
        updateChinaPub();
    });
};