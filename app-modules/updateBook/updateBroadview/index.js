'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getBroadviewData = require('./getBroadviewData');

    const offsets = [];

    for (let offset = 0; offset <= 4; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'Broadview',
            mail: {
                title: 'Broadview有新书啦~',
                template: ({ url = '', title = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                <img src="${cover}" alt="">
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getBroadviewData({
                    offsets
                });
            },
            filterKey: 'url'
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};