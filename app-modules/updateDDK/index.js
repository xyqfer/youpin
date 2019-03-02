'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getData = require('./getData');

    const filterKey = 'url';
    const dbName = 'Dribbble';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '每日新菜有更新~',
                template: ({ title = '', summary = '', }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <h2>${title}</h2>
                            <div>
                                ${summary}
                            </div>
                        </div>
                    `;
                }
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