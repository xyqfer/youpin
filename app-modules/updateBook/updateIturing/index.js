'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getIturingData = require('./getIturingData');

    const offsets = [];

    for (let offset = 1; offset <= 5; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'Ituring',
            mail: {
                title: '图灵有新书',
                template: ({ url = '', title = '', cover = '', desc = '' }) => `
                        <div style="margin-bottom: 60px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                <img src="${cover}" alt="">
                            </div>
                            <p>
                                ${desc}
                            </p>
                        </div>
                    `,
            },
            getTargetData: () =>
                getIturingData({
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
