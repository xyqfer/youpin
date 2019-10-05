'use strict';

const _ = require('lodash');
const getGitHubData = require('./getGitHubData');
const {
    db: {
        getDbData,
        getDbCount,
        saveDbData
    },
    mail: sendMail
} = require('app-libs');

module.exports = async () => {
    const dbName = 'GitHubTrending';
    const filterKey = 'name';

    try {
        const per = 1000;
        const dbCount = await getDbCount({
            dbName,
        });
        const maxDbFetchTimes = 10;
        const times = Math.min(Math.ceil(dbCount / per), maxDbFetchTimes);
        const offsets = _.times(times, (i) => {
            return i * per;
        });

        let dbData = await Promise.mapSeries(offsets, async (offset) => {
            const dbData = await getDbData({
                dbName,
                query: {
                    descending: ['updatedAt'],
                    skip: [offset],
                },
            });

            return dbData;
        });
        dbData = _.flattenDeep(dbData);

        const githubData = await getGitHubData();
        let newData = _.differenceBy(githubData, dbData, filterKey);

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
                    data: newData.map((item) => {
                        return {
                            name: item.name
                        };
                    })
                });
                sendMail({
                    title: 'GitHub NEW Trending',
                    data: newData,
                    template: ({ url = '', name = '', desc = '', lang = '' }) => {
                        return `
                            <div style="margin-bottom: 50px">
                                <a href="${url}" target="_blank">
                                    <h4>${name}</h4>
                                </a>
                                <p>
                                    ${desc}
                                </p>
                                <p>
                                    ${lang}
                                </p>
                            </div>
                        `;
                    },
                    device: 'device2',
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