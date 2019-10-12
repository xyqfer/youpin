'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getSMZDMData = require('./getSMZDMData');

    try {
        return await updateContainer({
            dbName: 'SMZDM',
            mail: {
                title: '什么值得买有更新',
                template: ({ url = '', title = '', cover = '', desc = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}" target="_blank">
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
                return getSMZDMData();
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