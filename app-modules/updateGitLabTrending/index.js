'use strict';

module.exports = async () => {
    const unescape = require('unescape');
    const updateContainer = require('app-containers/update');
    const getGitLabData = require('./getGitLabData');

    const filterKey = 'url';
    const dbName = 'GitLabTrending';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'GitLab NEW Trending',
                template: ({ title = '', summary = '', url = '' }) => `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${unescape(summary)}
                            </div>
                        </div>
                    `,
            },
            getTargetData: () => getGitLabData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
