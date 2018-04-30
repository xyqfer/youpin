'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const updateContainer = require('app-containers/update');
    const getZhihuHotData = require('./getZhihuHotData');
    const { getDbData } = require('app-libs/db');

    const filterKey = 'url';
    const dbName = 'ZhihuHot';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '知乎热榜有更新~',
                template: ({ url = '', title = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getZhihuHotData();
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