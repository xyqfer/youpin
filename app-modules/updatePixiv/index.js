'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getPixivData = require('./getPixivData');

    const filterKey = 'workId';
    const dbName = 'Pixiv';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Pixiv 有更新',
                template: ({ title = '', img = '', url = '' }) => {
                    return `
                      <div style="margin-bottom: 30px">
                        <a href="${url}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                        <div>
                            <img src="${img}" alt="">
                        </div>
                      </div>
                    `;
                }
            },
            getTargetData: () => {
                return getPixivData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};