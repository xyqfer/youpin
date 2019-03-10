'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getData = require('./getData');

    const filterKey = 'url';
    const dbName = 'OSChina';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '南风窗有更新',
                template: ({ title = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}" target="_blank">
                                ${title}
                              </a>
                            </h4>
                        </div>
                    `;
                },
                device: 'device2',
            },
            getTargetData: () => {
                return getData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};