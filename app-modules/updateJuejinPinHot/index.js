'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getPinData = require('./getPinData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '掘金 pin 有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                        <br><br>
                    `;
                }
            },
            getTargetData: () => {
                return getPinData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};