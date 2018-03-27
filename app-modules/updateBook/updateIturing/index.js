'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getIturingData = require('./getIturingData');

    const offsets = [];

    for (let offset = 0; offset <= 4; offset += 1) {
        offsets.push(offset);
    }

    try {
        return await updateContainer({
            dbName: 'Ituring',
            mail: {
                title: '图灵有新书啦~',
                template: ({ url = '', title = '', cover = '', desc = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <p>
                                ${desc}
                            </p>
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
                return getIturingData({
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