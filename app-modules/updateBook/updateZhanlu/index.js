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
                title: '湛庐有新书啦~',
                template: ({ url = '', title = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                <img src="${cover}" 
                                    alt="">
                            </div>
                        </div>
                        <br><br>
                    `;
                }
            },
            getTargetData: () => {
                return getZhanluData({
                    offsets
                });
            },
            filterKey: 'bookId'
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};