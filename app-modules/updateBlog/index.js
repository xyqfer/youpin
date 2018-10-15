'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getBlogData = require('./getBlogData');

    const filterKey = 'url';
    const dbName = 'WechatAnnounce';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '关注的博客有更新',
                template: ({ title = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}">
                                ${title}
                              </a>
                            </h4>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getBlogData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};