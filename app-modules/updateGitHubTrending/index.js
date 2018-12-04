'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const getGitHubData = require('./getGitHubData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        mail: sendMail
    } = require('app-libs');

    const dbName = 'GitHubTrending';
    const filterKey = 'name';

    try {
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });
        const githubData = await getGitHubData();

        let newData = githubData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item[filterKey] === dbData[i][filterKey]) {
                    return false;
                }
            }

            return true;
        });

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