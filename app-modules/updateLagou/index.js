'use strict';

module.exports = async () => {
    const moment = require('moment');
    const getLagouData = require('./getLagouData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        mail: sendMail
    } = require('app-libs');

    const dbName = 'Lagou';

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

            sendMail({
                title: '拉勾有新职位啦~',
                data,
                template: ({ url = '', title = '', summary = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <p>
                                ${summary}
                            </p>
                        </div>
                    `;
                }
            });

            return data;
        } else {
            const [ dbData, lagouData ] = await Promise.all([
                getDbData({
                    dbName,
                    query: {
                        descending: ['updatedAt']
                    }
                }),
                getLagouData()
            ]);

            const newData = lagouData.filter((item) => {
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