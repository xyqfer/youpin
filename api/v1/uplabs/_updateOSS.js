'use strict';

module.exports = (data) => {
    const OSS = require('ali-oss');
    const updateCDN = require('./_updateCDN');

    const oss = new OSS.Wrapper({
        accessKeyId: process.env.OSSAccessKeyId,
        accessKeySecret: process.env.OSSAccessKeySecret,
        region: process.env.OSSRegion,
        bucket: process.env.OSSBucket
    });

    if (!Array.isArray(data)) {
        data = [data];
    }

    data.forEach((ossItem) => {
        oss.put(`api/v1/uplabs/${ossItem.id}.json`, Buffer.from(JSON.stringify(ossItem))).then((data) => {

        }).catch((err) => {
            console.log(err);
        });
    });

    updateCDN(data);
};