'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getSMZDMData = require('./getSMZDMData');

    const offsets = [];

    for (let offset = 1; offset <= 3; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'SMZDM',
            mail: {
                title: '什么值得买有更新了~',
                template: ({ url = '', title = '', cover = '', desc = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${desc}
                            </div>
                            <div>
                                <img src="${cover}" 
                                    alt="">
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getSMZDMData({
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