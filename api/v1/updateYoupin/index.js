'use strict';

module.exports = (req, res, next) => {
    const getYoupinData = require('./getYoupinData');
    const saveYoupinData = require('./saveYoupinData');
    const {
        db: {
            getDbData
        },
        params,
        mail: sendMail
    } = require('app-lib');

    const dbName = 'Mi_store';

    (async () => {
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });

        const youpinData = await getYoupinData();

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
    })();

    res.end();
};
