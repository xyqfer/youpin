'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const fetchRSS = require('app-containers/fetchRSS');
    const filterNewData = require('app-containers/filterNewData');

    const filterKey = 'url';
    const dbName = 'DATA_TECH';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '科技博客有更新',
                template: ({ title = '', url = '' }) => {
                    const u = new URL(url)

                    if (u.host === 'github.com') {
                        u.host = process.env.GITHUB_HOST2
                    }

                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${u.toString()}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `
                },
                device: 'device1',
                open: 'chrome',
            },
            async getNewData(dbData) {
              return await filterNewData({
                dbData, 
                dbName,
                filterKey,
                rss: {
                  source: 'RSS_TechBlog',
                  appendTitle: true,
                },
              });
            },
            // getTargetData: () =>
            //     fetchRSS({
            //         source: 'RSS_TechBlog',
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
