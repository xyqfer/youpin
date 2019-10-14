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
                title: 'Notch 图片有更新',
                template: ({ title = '', summary = '' }) => `
                        <div style="margin-bottom: 30px">
                            <h4>${title}</h4>
                            <div>
                                ${summary}
                            </div>
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
