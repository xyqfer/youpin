'use strict';

module.exports = () => {
    const updateDouban = require('./updateDouban');
    const updateChinaPub = require('./updateChinaPub');
    const updateZhongxin = require('./updateZhongxin');

    return updateDouban().then(() => {
        return updateZhongxin();
    }).then(() => {
        updateChinaPub();
    }).catch((err) => {
        console.error(err);
    });
};