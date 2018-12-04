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
                title: 'Octocat 有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}" target="_blank">
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
                return getOctocatData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};