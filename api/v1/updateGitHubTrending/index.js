'use strict';

module.exports = () => {
    const path = require('path');
    const getGitHubData = require('./getGitHubData');
    const sendMail = require(path.resolve(process.cwd(), 'api/lib/mail'));
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

        if (newData.length > 0 && process.env.LEANCLOUD_APP_ENV !== 'development') {
            const mailContent = newData.map((item) => {
                return `
                    <div style="margin-bottom: 50px">
                        <a href="${item.url}">
                            <h4>${item.name}</h4>
                        </a>
                        <p>
                            ${item.desc}
                        </p>
                        <p>
                            ${item.lang}
                        </p>
                    </div>
                    `;
            }).join('');

            saveDbData({
                dbName,
                data: newData
            });
            sendMail({
                title: 'GitHub NEW Trending',
                mailContent: mailContent
            });
        }

        return {
            finish: true
        };
    })();
};