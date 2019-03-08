'use strict';

module.exports = () => {
    const rp = require('request-promise');

    const urls = [
        'https://sy2bnjwp1a.leanapp.cn',
        'https://ibdkopi6vn.avosapps.us/',
        'https://gfvlj9un2g.avosapps.us/',
        'https://rsshub.avosapps.us/',
        'https://ybhdqmyloo.us-south.cf.appdomain.cloud/',
    ];

    Promise.all(
        urls.map((uri) => {
            return rp.get({
                uri
            });
        })
    ).catch(() => {});

    return {
        success: true
    };
};