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
                title: 'Uplabs 有更新',
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
            getTargetData: () => getUplabsData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
