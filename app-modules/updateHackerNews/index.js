'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getHackerNewsData = require('./getHackerNewsData');

    const offsets = [];

    for (let offset = 1; offset <= 3; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'HackerNews',
            mail: {
                title: 'HackerNews 有更新',
                template: ({ url = '', title = '' }) => `
                        <div style="margin-bottom: 50px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `,
            },
            getTargetData: () =>
                getHackerNewsData({
                    offsets,
                }),
            filterKey: 'newsId',
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
