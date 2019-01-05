'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getTerminusData = require('./getTerminusData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Term有更新~',
                template: ({ title = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                        <br><br>
                    `;
                },
                device: 'device2',
            },
            getTargetData: () => {
                return getTerminusData();
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};