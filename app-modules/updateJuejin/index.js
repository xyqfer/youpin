'use strict';

module.exports = async () => {
    const getJuejinData = require('./getJuejinData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-libs');

    const dbName = 'Juejin';
    const offsets = [];

    for (let offset = 0; offset <= 120; offset += 30) {
        offsets.push(offset);
    }

    try {
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });
        const juejinData = await getJuejinData({
            offsets
        });

        const newData = juejinData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.postId === dbData[i].postId) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && !params.env.isDev) {
            saveDbData({
                dbName,
                data: newData
            });
            sendMail({
                title: '掘金有更新了~',
                data: newData,
                template: ({ url = '', title = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `;
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