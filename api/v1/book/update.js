'use strict';

module.exports = (req, res) => {
    const updateDouban = require('./_updateDouban');
    const updateChinaPub = require('./_updateChinaPub');
    const updateZhongxin = require('./_updateZhongxin');

    updateDouban().then(() => {
        return updateZhongxin();
    }).then(() => {
        return updateChinaPub();
    });

    res.end();
};