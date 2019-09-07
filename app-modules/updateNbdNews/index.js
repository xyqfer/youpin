'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const fetchRSS = require('app-containers/fetchRSS');

    const filterKey = 'url';
    const dbName = 'WechatAnnounce';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'NbdNews 有更新~',
                template: ({ title = '', url = '', }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `;
                },
            },
            getTargetData: () => {
                return fetchRSS({
                    source: 'RSS_NbdNews',
                });
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};