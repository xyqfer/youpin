'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getOctocatData = require('./getOctocatData');

    const filterKey = 'url';
    const dbName = 'Octocat';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Octocat 有更新',
                template: ({ title = '', summary = '', url = '' }) => `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                    `,
            },
            getTargetData: () => getOctocatData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
