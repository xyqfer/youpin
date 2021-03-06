'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getKelemiaoData = require('./getKelemiaoData');

    const filterKey = 'url';
    const dbName = 'OSChina';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '可乐庙有更新',
                template: ({ title = '', url = '' }) => `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}" target="_blank">
                                ${title}
                              </a>
                            </h4>
                        </div>
                    `,
                open: 'safari',
            },
            getTargetData: () => getKelemiaoData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
