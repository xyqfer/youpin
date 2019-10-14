'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getDangdangData = require('./getDangdangData');

    const offsets = [];
    for (let offset = 1; offset <= 2; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'Broadview',
            mail: {
                title: '当当有新书',
                template: ({ url = '', title = '', cover = '' }) => `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                <img src="${cover}" alt="">
                            </div>
                        </div>
                    `,
            },
            getTargetData: () =>
                getDangdangData({
                    offsets,
                }),
            filterKey: 'url',
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
