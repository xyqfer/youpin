'use strict';

module.exports = async () => {
    const unescape = require('unescape');
    const updateContainer = require('app-containers/update');
    const getUplabsData = require('./getUplabsData');

    const filterKey = 'url';
    const dbName = 'Uplabs';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Uplabs 有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${unescape(summary)}
                            </div>
                        </div>
                        <br><br>
                    `;
                }
            },
            getTargetData: () => {
                return getUplabsData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};