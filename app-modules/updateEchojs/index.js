'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getEchojsData = require('./getEchojsData');

    const filterKey = 'url';
    const dbName = 'Echojs';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Echojs 有更新',
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
            getTargetData: () => getEchojsData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
