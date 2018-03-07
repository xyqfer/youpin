'use strict';

module.exports = () => {
    const path = require('path');
    const getGitHubData = require('./getGitHubData');
    const sendMail = require(path.resolve(process.cwd(), 'api/lib/mail'));
    const params = require(path.resolve(process.cwd(), 'api/lib/params'));
    const { getDbData, saveDbData } = require(path.resolve(process.cwd(), 'api/lib/db'));

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
                data: newData
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