'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getDribbbleData = require('./getDribbbleData');

    const filterKey = 'url';
    const dbName = 'Dribbble';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Dribbble 有更新',
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
            getTargetData: () => getDribbbleData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
