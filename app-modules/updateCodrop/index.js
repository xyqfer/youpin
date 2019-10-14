'use strict';

module.exports = async () => {
    const getCodropData = require('./getCodropData');
    const {
        db: { getDbData, saveDbData },
        mail: sendMail,
    } = require('app-libs');

    const dbName = 'Codrop';

    try {
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt'],
            },
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

        if (newData.length > 0) {
            saveDbData({
                dbName,
                data: newData.map((item) => ({
                    postId: item.postId,
                })),
            });
            sendMail({
                title: 'Codrop 更新啦',
                data: newData,
                template: ({ url = '', name = '' }) => `<div><a href='${url}' target='_blank'><h4>${name}</h4></a><br></div>`,
                device: 'device2',
                open: 'safari',
                proxy: true,
            });
        }

        return newData;
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
