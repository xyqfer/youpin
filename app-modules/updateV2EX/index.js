'use strict';

module.exports = () => {
    const moment = require('moment');
    const getV2EXData = require('./getV2EXData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-libs');

    const dbName = 'V2EXHot';

    // 早上8点15分前发邮件
    const today = new Date();
    const needSendMail = today.getHours() === 8 && today.getMinutes() <= 15;

    if (needSendMail && !params.env.isDev) {
        const yesterday = new Date(`${moment().add(-1, 'days').format('YYYY-MM-DD 00:00:00')}`);

        return getDbData({
            dbName,
            query: {
                greaterThanOrEqualTo: ['updatedAt', yesterday]
            }
        }).then((data) => {
            return sendMail({
                title: 'v2 昨日热议主题',
                data,
                template: (url = '', title = '', content = '') => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <p>
                                ${content}
                            </p>
                        </div>
                    `;
                }
            });
        });
    } else {
        return Promise.all([
            getDbData({
                dbName,
                query: {
                    descending: ['updatedAt']
                }
            }),
            getV2EXData()
        ]).then(([dbData, v2exData]) => {
            const newData = v2exData.filter((item) => {
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
            }

            return newData;
        });
    }
};