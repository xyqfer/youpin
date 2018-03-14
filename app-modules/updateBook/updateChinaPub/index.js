'use strict';

module.exports = async () => {
    const getChinaPubData = require('./getChinaPubData');
    const getNewData = require('./getNewData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-libs');

    try {
        const dbName = 'ChinaPubBooks';

        const dbData = await getDbData({
            dbName
        });
        const chinaPubData = await getChinaPubData();
        const newData = await getNewData({ dbData, chinaPubData });

        if (newData.length > 0 && !params.env.isDev) {
            saveDbData({
                dbName,
                data: newData
            });

            sendMail({
                title: 'ChinaPub 有新书啦',
                data: newData,
                template: ({ url = '', name = '', intro = '', cover = '' }) => {
                    const bookUrl = `${process.env.hostName}/api/v1/book/redirect?url=${encodeURIComponent(url)}`;
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${bookUrl}">
                                <h4>${name}</h4>
                            </a>
                            <p>
                                ${intro}
                            </p>
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
