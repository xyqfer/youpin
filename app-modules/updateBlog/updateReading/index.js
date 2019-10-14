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
                title: '阅读材料有更新',
                template: ({ title = '', url = '' }) => `
              <div style="margin-bottom: 50px">
                  <a href="${url}" target="_blank">
                    <h4>${title}</h4>
                  </a>
              </div>
          `,
                device: 'device2',
                open: 'safari',
            },
            getTargetData: () => getBlogData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
