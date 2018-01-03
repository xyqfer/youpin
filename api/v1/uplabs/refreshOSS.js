'use strict';

module.exports = (req, res, next) => {
    const qcloudSDK = require('qcloud-cdn-node-sdk');
    const OSS = require('ali-oss');
    const Promise = require('bluebird');
    const loadData = require('./_loadData');
    const getFormatTime = require('./_formatTime');

    const pageCount = 5;
    const timeObj = getFormatTime();
    const currentYear = timeObj.year;
    const currentMonth = timeObj.month;
    const currentDate = timeObj.date;
    const path = 'https://uplabs-oss-1252013833.file.myqcloud.com/api/v1';
    let allData = [];
    let urlObj = {};

    const oss = new OSS.Wrapper({
        accessKeyId: 'LTAIEbg4BuvHj4Bi',
        accessKeySecret: 'yXaFTuVVpzuBxwxRUbutyBWzduZxE0',
        region: 'oss-cn-hangzhou',
        bucket: 'xingyongqiang'
    });

    let taskList = [];

    for (let i = 0; i < pageCount; i++) {
        urlObj[`urls.${i}`] = `${path}/uplabs/uplabs_${currentYear}-${currentMonth}-${currentDate}_${i}.json`;

        taskList.push(new Promise((resolve, reject) => {
            loadData({
                page: i,
                offset: 0
            }).then((data) => {
                const objectKey = `api/v1/uplabs/uplabs_${currentYear}-${currentMonth}-${currentDate}_${i}.json`;

                if (i == 0) {
                    allData = data;
                }

                oss.put(objectKey, Buffer.from(JSON.stringify(data))).then((data) => {
                    console.log(objectKey);
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
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
    }).catch((err) => {
        console.log(err);
        res.end();
    });
};