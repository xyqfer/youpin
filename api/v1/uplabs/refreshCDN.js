'use strict';

module.exports = (req, res, next) => {
    const getFormatTime = require('./_formatTime');
    const qcloudSDK = require('qcloud-cdn-node-sdk');

    const pageCount = 5;
    const { currentYear, currentMonth, currentDate } = getFormatTime();
    const path = 'https://uplabs-image-1252013833.file.myqcloud.com/api/v1';
    let urlObj = {};

    for (let i = 0; i < pageCount; i++) {
        urlObj[`urls.${i}`] = `${path}/uplabs/uplabs_${currentYear}-${currentMonth}-${currentDate}_${i}.json`;
    }

    qcloudSDK.config({
        secretId: process.env.CDNSecretId,
        secretKey: process.env.CDNSecretKey
    });

    qcloudSDK.request('RefreshCdnUrl', urlObj, (result) => {
        console.log(result);
        res.end();
    })
};