'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const shell = require('shelljs');

    const envString = shell.exec('lean env', {
        silent: true
    }).stdout;

    envString.split('\n').filter((item) => {
        return item !== '';
    }).forEach((item) => {
        const [ key, value ] = item.split(' ')[1].split('=');
        process.env[key] = value;
    });

    AV.init({
        appId: process.env.LEANCLOUD_APP_ID,
        appKey: process.env.LEANCLOUD_APP_KEY,
        masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
    });

    AV.Cloud.useMasterKey();
};