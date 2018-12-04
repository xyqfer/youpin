'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getOSChinaData = require('./getOSChinaData');

    const filterKey = 'url';
    const dbName = 'OSChina';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'OSChina-每日乱弹有更新',
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
                }
            },
            getTargetData: () => {
                return getOSChinaData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};