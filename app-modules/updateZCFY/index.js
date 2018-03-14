'use strict';

module.exports = async () => {
    const getZCFYData = require('./getZCFYData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-libs');

    const dbName = 'ZCFY';

    try {
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });
        const zcfyData = await getZCFYData();

        const newData = zcfyData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.url === dbData[i].url) {
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
                title: '众成翻译有更新了~',
                data: newData,
                template: ({ url = '', title = '', desc = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${desc}
                            </div>
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