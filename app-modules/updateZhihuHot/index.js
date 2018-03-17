'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getZhihuHotData = require('./getZhihuHotData');

    try {
        return await updateContainer({
            dbName: 'ZhihuHot',
            mail: {
                title: '知乎热榜有更新~',
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
                return getZhihuHotData();
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