'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getPinData = require('./getPinData');

    const filterKey = 'url';
    const dbName = 'Dribbble';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '知乎 Daily Pin 有更新',
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
            getTargetData: () => getPinData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
