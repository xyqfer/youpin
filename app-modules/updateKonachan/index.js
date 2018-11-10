'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getKonachanData = require('./getKonachanData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Konachan 有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                        <br><br>
                    `;
                }
            },
            getTargetData: () => {
                return getKonachanData();
            },
            filterData: function (dbData, targetData) {
                return Promise.filter(targetData, async (item) => {
                    for (let i = 0; i < dbData.length; i++) {
                        if (item[filterKey] === dbData[i][filterKey]) {
                            return false;
                        }
                    }

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
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};