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
                title: '当当有新书啦~',
                template: ({ url = '', title = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                <img src="${cover}" alt="">
                            </div>
                            <br><br>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getDangdangData({
                    offsets
                });
            },
            filterKey: 'url'
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};