'use strict';

module.exports = () => {
    const rp = require('request-promise');

    const urls = [
        'https://sy2bnjwp1a.leanapp.cn',
        'https://ibdkopi6vn.avosapps.us/',
        'https://rsshub.avosapps.us/'
    ];

    Promise.all(
        urls.map((uri) => {
            return rp.get({
                uri
            });
        })
    ).catch((err) => {
        console.log(err);
    });

    return {
        success: true
    };
};