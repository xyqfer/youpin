'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const getChinaPubData = require('./getChinaPubData');
    const getNewData = require('./getNewData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        mail: sendMail
    } = require('app-libs');

    try {
        const dbName = 'ChinaPubBooks';
        const filterKey = 'url';

        const dbData = await getDbData({
            dbName
        });
        const chinaPubData = await getChinaPubData();
        let newData = await getNewData({ dbData, chinaPubData });

        if (newData.length > 0) {
            newData = await Promise.filter(newData, async (item) => {
                const dbItem = await getDbData({
                    dbName,
                    limit: 1,
                    query: {
                        equalTo: [filterKey, item[filterKey]]
                    }
                });

                return dbItem.length === 0;
            }, {
                concurrency: 1
            });

            if (newData.length > 0) {
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
                        <div style="margin-bottom: 30px">
                            <a href="${bookUrl}" target="_blank">
                                <h4>${name}</h4>
                            </a>
                            <p>
                                ${intro}
                            </p>
                            <div>
                                <img src="${cover}" alt="">
                            </div>
                        </div>
                    `;
                    }
                });
            }
        }

        return newData;
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};
