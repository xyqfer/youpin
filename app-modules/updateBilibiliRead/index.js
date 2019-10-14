'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getBilibiliReadData = require('./getBilibiliReadData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'B站专栏有更新',
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
                device: 'device2',
            },
            getTargetData: () => getBilibiliReadData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
