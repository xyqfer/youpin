'use strict';

module.exports = () => {
    const rp = require('request-promise');

    rp.get({
        uri: 'https://sy2bnjwp1a.leanapp.cn'
    }).catch(() => {

    });

    rp.get({
        uri: 'https://ibdkopi6vn.avosapps.us/'
    }).catch(() => {

    });

    return {
        success: true
    };
};