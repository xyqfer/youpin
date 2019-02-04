'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getJuejinData = require('./getJuejinData');

    const offsets = [0];

    try {
        return await updateContainer({
            dbName: 'Juejin',
            mail: {
                title: '掘金有更新了~',
                template: ({ url = '', title = '', summary = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
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