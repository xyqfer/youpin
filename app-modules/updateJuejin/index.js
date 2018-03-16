'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getJuejinData = require('./getJuejinData');

    const offsets = [];

    for (let offset = 0; offset <= 120; offset += 30) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'Juejin',
            mail: {
                title: '掘金有更新了~',
                template: ({ url = '', title = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getJuejinData({
                    offsets
                });
            },
            filterKey: 'postId'
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};