'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getWechatAnnounceData = require('./getWechatAnnounceData');

    const filterKey = 'url';
    const dbName = 'WechatAnnounce';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '有新的微信公众平台-系统公告',
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
                return getWechatAnnounceData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};