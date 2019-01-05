'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const AV = require('leanengine');
    const getYoupinData = require('./getYoupinData');
    const saveYoupinData = require('./saveYoupinData');
    const {
        db: {
            getDbData
        },
        mail: sendMail
    } = require('app-libs');

    const dbName = 'Mi_store';
    const today = new Date();

    try {
        const needSendLeetcode = today.getHours() === 10 && (today.getMinutes() > 10 && today.getMinutes() < 30)
            && (today.getDay() >= 1 && today.getDay() <= 5);

        if (needSendLeetcode) {
            await AV.Cloud.run('updateLeetcode', {});
        }
    } catch (err) {
        console.log(err);
    }

    try {
        const needReadArticle = today.getHours() === 16 && (today.getMinutes() > 10 && today.getMinutes() < 30)
            && (today.getDay() >= 1 && today.getDay() <= 6);

        if (needReadArticle) {
            await AV.Cloud.run('execCloud', {
                name: 'updateArticleFragment',
            });
        }
    } catch (err) {
        console.log(err);
    }

    try {
        const [ dbData, youpinData ] = await Promise.all([
            getDbData({
                dbName,
                query: {
                    descending: ['updatedAt']
                }
            }),
            getYoupinData()
        ]);

        let newData = youpinData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.gid === dbData[i].gid) {
                    return false;
                }
            }

            return true;
        });

        const filterKey = 'gid';
        newData = await Promise.filter(newData, async (item) => {
            const dbItem = await getDbData({
                dbName,
                limit: 1,
                query: {
                    equalTo: [filterKey, item[filterKey]]
                }
            });

            return dbItem.length === 0;
        }, {
            concurrency: 1
        });

        if (newData.length > 0) {
            saveYoupinData({
                dbName,
                data: newData
            });
            sendMail({
                title: '米家上新品啦',
                data: newData,
                template: ({ url = '', name = '' }) => {
                    return `<div><a href='${url}' target='_blank'><h4>${name}</h4></a><br></div>`;
                }
            });
        }

        return newData;
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};
