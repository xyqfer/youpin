'use strict';

module.exports = (req, res) => {
    const qcloudSDK = require('qcloud-cdn-node-sdk');
    const OSS = require('ali-oss');
    const COS = require('cos-nodejs-sdk-v5');
    const rp = require('request-promise');

    const getFormatTime = require('./_formatTime');
    const formatData = require('./_formatData');

    const pageCount = 3;
    const timeObj = getFormatTime();
    const currentYear = timeObj.year;
    const currentMonth = timeObj.month;
    const currentDate = timeObj.date;
    const path = 'https://uplabs-oss-1252013833.file.myqcloud.com';
    const apiHost = process.env.LEANCLOUD_APP_ENV === 'development' ? 'http://localhost:3000' : process.env.LEANCLOUD_APP_ENV === 'production' ? process.env.hostName : process.env.stgHostName;

    const oss = new OSS.Wrapper({
        accessKeyId: process.env.OSSAccessKeyId,
        accessKeySecret: process.env.OSSAccessKeySecret,
        region: process.env.OSSRegion,
        bucket: process.env.OSSBucket,
    });

    const cos = new COS({
        SecretId: process.env.COSSecretId,
        SecretKey: process.env.COSSecretKey,
    });

    const objectKeyList = [];

    for (let i = 0; i < pageCount; i++) {
        objectKeyList.push(`api/v1/uplabs/uplabs_${currentYear}-${currentMonth}-${currentDate}_${i}.json`);
        objectKeyList.push(`api/v1/uplabs/uplabs_ios_${currentYear}-${currentMonth}-${currentDate}_${i}.json`);
        objectKeyList.push(`api/v1/uplabs/uplabs_android_${currentYear}-${currentMonth}-${currentDate}_${i}.json`);
    }

    const taskList = objectKeyList.map((objectKey) =>
        rp
            .get({
                uri: `${apiHost}/${objectKey}`,
                json: true,
            })
            .then((result) => {
                oss.put(objectKey, Buffer.from(JSON.stringify(formatData(result))));
            })
            .then(
                () =>
                    new Promise((resolve) => {
                        const params = {
                            Bucket: process.env.COSBucket2,
                            Region: process.env.COSRegion,
                            Key: objectKey,
                        };

                        cos.deleteObject(params, function(err, data) {
                            resolve(data);
                        });
                    })
            )
    );

    Promise.all(taskList)
        .then(() => {
            const urlObj = {};

            objectKeyList.forEach((objectKey, index) => {
                urlObj[`urls.${index}`] = `${path}/${objectKey}`;
            });

            qcloudSDK.request('RefreshCdnUrl', urlObj, (result) => {
                console.log(result);
                res.end();
            });
        })
        .catch(() => {
            res.end();
        });
};
