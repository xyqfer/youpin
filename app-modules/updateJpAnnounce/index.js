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
                title: '日语考试信息有更新',
                template: ({ title = '', url = '' }) => `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `,
            },
            getTargetData: () =>
                fetchRSS({
                    source: 'RSS_JpAnnounce',
                }),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
