'use strict';

module.exports = async () => {
    const getZhongxinBook = require('./getZhongxinBook');
    const {
        db: {
            getDbData,
            saveDbData
        },
        mail: sendMail
    } = require('app-libs');

    try {
        const dbName = 'ZhongxinBook';
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });

        const zhongxinData = await getZhongxinBook();

        const newData = zhongxinData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.bookId === dbData[i].bookId) {
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
                title: '中信有新书啦~',
                data: newData,
                template: ({ url = '', name = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}">
                                <h4>${name}</h4>
                            </a>
                            <div>
                                <img src="${cover}" 
                                    alt="">
                            </div>
                        </div>
                        <br><br>
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