'use strict';

module.exports = async () => {
  const updateContainer = require('app-containers/update');
  const fetchRSS = require('app-containers/fetchRSS');

  const filterKey = 'url';
  const dbName = 'WechatAnnounce';

  try {
    return await updateContainer({
      dbName,
      filterKey,
      mail: {
        title: '科技博客有更新',
        template: ({ title = '', url = '' }) => {
          return `
              <div style="margin-bottom: 50px">
                  <a href="${url}" target="_blank">
                    <h4>${title}</h4>
                  </a>
              </div>
          `;
        },
        device: 'device2',
        open: 'safari',
        proxy: true,
      },
      getTargetData: () => {
        return fetchRSS({
          source: 'RSS_TechBlog',
        });
      }
    });
  } catch (err) {
    console.error(err);
    return {
      success: false
    };
  }
};