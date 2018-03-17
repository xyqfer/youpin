'use strict';

module.exports = () => {
    const rp = require('request-promise');

    rp.get({
        uri: 'https://stg-sy2bnjwp1a.leanapp.cn'
    }).catch(() => {

    });

    console.log('wake');
    return {
        success: true
    };
};