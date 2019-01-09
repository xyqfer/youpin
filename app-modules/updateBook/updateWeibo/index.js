'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getWeiboData = require('./getWeiboData');

    const offsets = [];

    for (let offset = 1; offset <= 5; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'WeiboBook',
            mail: {
                title: '微博新书快讯~',
                template: ({ title = '', cover = '', desc = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <h4>${title}</h4>
                            <p>
                                ${desc}
                            </p>
                            <div>
                                <img src="${cover}" alt="">
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getWeiboData({
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