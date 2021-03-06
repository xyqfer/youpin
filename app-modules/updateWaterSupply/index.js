'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getWaterSupplyData = require('./getWaterSupplyData');

    const filterKey = 'url';
    const dbName = 'WaterSupply';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '有新的停水通知',
                template: ({ title = '', url = '' }) => `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}" target="_blank">
                                ${title}
                              </a>
                            </h4>
                        </div>
                    `,
            },
            getTargetData: () => getWaterSupplyData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
