'use strict';

module.exports = (data) => {
    const qcloudSDK = require('qcloud-cdn-node-sdk');

    qcloudSDK.config({
        secretId: process.env.CDNSecretId,
        secretKey: process.env.CDNSecretKey,
    });

    const urlObj = {};
    let urlIndex = 0;

    if (!Array.isArray(data)) {
        data = [data];
    }

    data.forEach((ossItem) => {
        urlObj[`urls.${urlIndex++}`] = ossItem.cover;

        ossItem.urls.forEach((imgItem) => {
            urlObj[`urls.${urlIndex++}`] = imgItem;
        });

        if (ossItem.avatar && ossItem.avatar !== '') {
            urlObj[`urls.${urlIndex++}`] = ossItem.avatar;
        }
    });

    qcloudSDK.request('RefreshCdnUrl', urlObj, (result) => {
        console.log(result);
    });
};
