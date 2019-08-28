'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const fetchRSS = require('app-containers/fetchRSS');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Konachan 有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                    `;
                },
                device: 'device2',
                open: 'safari',
                proxy: true,
            },
            getTargetData: () => {
                return fetchRSS({
                    source: 'RSS_Konachan',
                    field: ['title', 'link', 'content'],
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