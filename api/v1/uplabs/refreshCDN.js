'use strict';

module.exports = (req, res, next) => {
    const qcloudSDK = require('qcloud-cdn-node-sdk');
    const COS = require('cos-nodejs-sdk-v5');
    const Promise = require('bluebird');
    const loadData = require('./_loadData');
    const getFormatTime = require('./_formatTime');

    const pageCount = 5;
    const timeObj = getFormatTime();
    const currentYear = timeObj.year;
    const currentMonth = timeObj.month;
    const currentDate = timeObj.date;
    const path = 'https://uplabs-image-1252013833.file.myqcloud.com/api/v1';
    let allData = [];
    let urlObj = {};

    const cos = new COS({
        SecretId: process.env.COSSecretId,
        SecretKey: process.env.COSSecretKey
    });

    let taskList = [];

    for (let i = 0; i < pageCount; i++) {
        urlObj[`urls.${i}`] = `${path}/uplabs/uplabs_${currentYear}-${currentMonth}-${currentDate}_${i}.json`;

        taskList.push(new Promise((resolve, reject) => {
            let url = `https://www.uplabs.com/showcases/all/more.json?days_ago=0&per_page=12&page=${i}`;

            if (i == 0) {
                url = `https://www.uplabs.com/all.json?days_ago=0&page=1`;
            }

            loadData({
                url: url,
                platform: ''
            }).then((data) => {
                const objectKey = `api/v1/uplabs/uplabs_${currentYear}-${currentMonth}-${currentDate}_${i}.json`;

                if (i == 0) {
                    allData = data;
                }

                cos.putObject({
                    Bucket: process.env.COSBucket,
                    Region: process.env.COSRegion,
                    Key: objectKey,
                    Body: Buffer.from(JSON.stringify(data))
                }, function (err, data) {
                    console.log(objectKey);

                    if (err) {
                        console.log(err);
                    }

                    resolve(data);
                });
            });
        }));
    }

    Promise.all(taskList).then((resultList) => {
        qcloudSDK.config({
            secretId: process.env.CDNSecretId,
            secretKey: process.env.CDNSecretKey
        });

        let coverUrlIndex = pageCount;

        allData.forEach((item) => {
            urlObj[`urls.${coverUrlIndex++}`] = item.cover;
        });

        console.log(urlObj);

        qcloudSDK.request('RefreshCdnUrl', urlObj, (result) => {
            console.log(result);
            res.end();
        });
        res.end();
    });
};