'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getData = require('./getData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'BI有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h2>${title}</h2>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                    `;
                },
                device: 'device2',
            },
            getTargetData: () => {
                return getData();
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};