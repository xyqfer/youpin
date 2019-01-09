'use strict';

module.exports = async () => {
    const getDoubanData = require('./getDoubanData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        mail: sendMail
    } = require('app-libs');

    try {
        const dbName = 'DoubanBook';

        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });
        const doubanData = await getDoubanData();

        const newData = doubanData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.url === dbData[i].url) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0) {
            saveDbData({
                dbName,
                data: newData
            });

            sendMail({
                title: '豆瓣有新书啦~',
                data: newData,
                template: ({ name = '', url = '', desc = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${name}</h4>
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