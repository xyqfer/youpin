'use strict';

const updateContainer = require('app-containers/update');
const getGitHubData = require('./getGitHubData');

module.exports = async () => {
    const dbName = 'GitHubTrending';
    const filterKey = 'name';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            getTargetData: () => getGitHubData(),
            mail: {
                title: 'GitHub NEW Trending',
                template: ({ url = '', name = '', desc = '', lang = '' }) => `
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
                `,
                device: 'device1',
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
