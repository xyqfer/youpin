'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getTEData = require('./getTEData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'TE 杂志有更新',
                device: 'device2',
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
            getTargetData: () => getTEData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
