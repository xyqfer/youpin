'use strict';

module.exports = async () => {
    const getYoupinData = require('./getYoupinData');
    const saveYoupinData = require('./saveYoupinData');
    const {
        db: {
            getDbData
        },
        params,
        mail: sendMail
    } = require('app-libs');

    const dbName = 'Mi_store';

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

        const newData = youpinData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.gid === dbData[i].gid) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && !params.env.isDev) {
            saveYoupinData({
                dbName,
                data: newData
            });
            sendMail({
                title: '米家上新品啦',
                data: newData,
                template: (url = '', name = '') => {
                    return `<a href='${url}'>${name}</a><br><br>`;
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
