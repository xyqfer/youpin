'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getWechatAnnounceData = require('./getWechatAnnounceData');

    try {
        const filterKey = 'url';
        const dbName = 'WechatAnnounce';

        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '有新的微信公众平台-系统公告',
                template: ({ title = '', url = '' }) => `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}" target="_blank">
                                ${title}
                              </a>
                            </h4>
                        </div>
                    `,
            },
            getTargetData: () => getWechatAnnounceData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
