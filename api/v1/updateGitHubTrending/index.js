'use strict';

module.exports = () => {
    const getGitHubData = require('./getGitHubData');
    const {
        db: {
            getDbData,
            saveDbData
        },
        params,
        mail: sendMail
    } = require('app-lib');

    const dbName = 'GitHubTrending';

    return (async () => {
        const dbData = await getDbData({
            dbName,
            query: {
                descending: ['updatedAt']
            }
        });
        const githubData = await getGitHubData();

        const newData = githubData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.name === dbData[i].name) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && params.env !== 'development') {
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
                template: ({ url = '', name = '', desc = '', lang = ''}) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
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

        return {
            finish: true
        };
    })();
};