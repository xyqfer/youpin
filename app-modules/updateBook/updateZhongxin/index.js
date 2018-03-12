'use strict';

module.exports = async () => {
    const getZhongxinBook = require('./getZhongxinBook');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-lib');

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

        if (newData.length > 0 && !params.env.isDev) {
            saveDbData({
                dbData,
                data: newData
            });

            sendMail({
                title: '中信有新书啦~',
                data: newData,
                template: (url = '', title = '', cover = '') => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}">
                                <h4>${title}</h4>
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

        return {
            success: true
        };
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};