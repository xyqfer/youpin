'use strict';

module.exports = async () => {
    const getYouzanBook = require('./getYouzanBook');
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

        const youzanData = await getYouzanBook();

        const newData = youzanData.filter((item) => {
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
                title: '有赞商城有新书',
                data: newData,
                template: ({ url = '', name = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${name}</h4>
                            </a>
                            <div>
                                <img src="${cover}" alt="">
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