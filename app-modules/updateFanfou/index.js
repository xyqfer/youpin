'use strict';

module.exports = async () => {
    const moment = require('moment');
    const getFanfouData = require('./getFanfouData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        mail: sendMail
    } = require('app-libs');

    const dbName = 'FanfouContent';

    // 晚上10点15分前发邮件
    const today = new Date();
    const needSendMail = today.getHours() === 22 && today.getMinutes() <= 15;

    try {
        if (needSendMail) {
            const time = new Date(`${moment().add(-22, 'hours').format('YYYY-MM-DD 00:00:00')}`);

            const data = await getDbData({
                dbName,
                query: {
                    greaterThanOrEqualTo: ['updatedAt', time]
                }
            });

            if (data && data.length > 0) {
                sendMail({
                    title: '饭否有更新啦~',
                    data,
                    template: ({ content = '', postId = '' }) => {
                        return `
                        <div style="margin-bottom: 50px">
                            <a href="http://fanfou.com/statuses/${postId}" target="_blank">
                                <h4>${postId}</h4>
                            </a>
                            <p>
                                ${content}
                            </p>
                        </div>
                    `;
                    }
                });
            }

            return data;
        } else {
            const [ dbData, fanfouData ] = await Promise.all([
                getDbData({
                    dbName,
                    query: {
                        descending: ['updatedAt']
                    }
                }),
                getFanfouData()
            ]);

            const newData = fanfouData.filter((item) => {
                for (let i = 0; i < dbData.length; i++) {
                    if (item.postId === dbData[i].postId) {
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
            }

            return newData;
        }
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};