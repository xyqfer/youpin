'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getBooksetData = require('./getBooksetData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Bookset有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                        <br><br>
                    `;
                },
                device: 'device2',
            },
            getTargetData: () => {
                return getBooksetData();
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};