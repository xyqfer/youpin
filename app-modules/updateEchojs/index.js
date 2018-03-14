'use strict';

module.exports = async () => {
    const getEchojsData = require('./getEchojsData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-libs');

    const dbName = 'Echojs';

    try {
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });
        const echojsData = await getEchojsData();

        const newData = echojsData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.newsId === dbData[i].newsId) {
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
                title: 'Echojs有更新了~',
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