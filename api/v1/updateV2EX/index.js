'use strict';

module.exports = (req, res, next) => {
    const moment = require('moment');
    const getV2EXData = require('./getV2EXData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-lib');

    const dbName = 'V2EXHot';

    // 早上8点15分前发邮件
    const today = new Date();
    const needSendMail = today.getHours() === 8 && today.getMinutes() <= 15;

    (async () => {
        try {
            if (needSendMail && !params.env.isDev) {
                const yesterday = new Date(`${moment().add(-1, 'days').format('YYYY-MM-DD 00:00:00')}`);
                const data = await getDbData({
                    dbName,
                    query: {
                        greaterThanOrEqualTo: ['updatedAt', yesterday]
                    }
                });

                sendMail({
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
            } else {
                const dbData = await getDbData({
                    dbName,
                    query: {
                        descending: ['updatedAt']
                    }
                });

                const v2exData = await getV2EXData();

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
            }
        } catch (err) {
            console.error(err);
        }
    })();

    res.end();
};