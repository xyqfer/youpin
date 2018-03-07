'use strict';

module.exports = () => {
    const path = require('path');
    const getCodropData = require('./getCodropData');
    const sendMail = require(path.resolve(process.cwd(), 'api/lib/mail'));
    const params = require(path.resolve(process.cwd(), 'api/lib/params'));
    const { getDbData, saveDbData } = require(path.resolve(process.cwd(), 'api/lib/db'));

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

        if (newData.length > 0 && params.env !== 'development') {
            saveDbData({
                dbName,
                data: newData
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