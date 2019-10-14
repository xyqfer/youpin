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
                title: '新闻联播有更新',
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
            getTargetData: () => getData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
