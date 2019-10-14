'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getZhanluData = require('./getZhanluData');

    const offsets = [];

    for (let offset = 1; offset <= 5; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'Zhanlu',
            mail: {
                title: '湛庐有新书',
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
                getZhanluData({
                    offsets,
                }),
            filterKey: 'bookId',
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
