'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getAppStoreData = require('./getAppStoreData');

    const filterKey = 'url';
    const dbName = 'Blogread';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'App Store Today 有更新',
                template: ({ title = '', url = '', summary = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}">
                                ${title}
                              </a>
                            </h4>
                            <div>
                                ${summary}
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getAppStoreData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};