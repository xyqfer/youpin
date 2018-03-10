'use strict';

module.exports = () => {
    const getCodropData = require('./getCodropData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-lib');

    const dbName = 'Codrop';

    return (async () => {
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });
        const codropData = await getCodropData();

        const newData = codropData.filter((codropItem) => {
            for (let i = 0; i < dbData.length; i++) {
                if (dbData[i].postId === codropItem.postId) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && !params.env.isDev) {
            saveDbData({
                dbName,
                data: newData.map((item) => {
                    return {
                        postId: item.postId
                    };
                })
            });
            sendMail({
                title: 'Codrop 更新啦',
                data: newData,
                template: ({ url = '', name = '' }) => {
                    return `<a href='${url}'>${name}</a><br><br>`;
                }
            });
        }

        return {
            finish: true
        };
    })();
};