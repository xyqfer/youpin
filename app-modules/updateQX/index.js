'use strict';
const updateContainer = require('app-containers/update');
const fetchRSS = require('app-containers/fetchRSS');

module.exports = async () => {
    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'QX 有更新',
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
                device: 'device1',
            },
            getTargetData: () =>
                fetchRSS({
                    source: 'RSS_QX',
                    field: ['title', 'link', 'content'],
                }),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
