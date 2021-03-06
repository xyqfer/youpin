'use strict';
const updateContainer = require('app-containers/update');
const fetchRSS = require('app-containers/fetchRSS');
const filterNewData = require('app-containers/filterNewData');

module.exports = async () => {
    const filterKey = 'url';
    const dbName = 'WechatAnnounce';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '文学博客有更新',
                template: ({ title = '', url = '' }) => `
                    <div style="margin-bottom: 50px">
                        <a href="${url}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                    </div>
                `,
                device: 'device1',
                open: 'chrome',
            },
            async getNewData(dbData) {
              return await filterNewData({
                dbData,
                dbName, 
                filterKey,
                rss: {
                  source: 'RSS_LiteratureBlog',
                  appendTitle: true,
                },
              });
            },
            // getTargetData: () =>
            //     fetchRSS({
            //         source: 'RSS_LiteratureBlog',
            //         appendTitle: true,
            //     }),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
