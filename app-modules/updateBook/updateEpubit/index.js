'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getEpubitData = require('./getEpubitData');

    const offsets = [];

    for (let offset = 1; offset <= 5; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'Epubit',
            mail: {
                title: '异步有新书啦~',
                template: ({ url = '', title = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                <img src="${cover}" 
                                    alt="">
                            </div>
                            <br><br>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getEpubitData({
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