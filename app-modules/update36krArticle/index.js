'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const fetchRSS = require('app-containers/fetchRSS');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '36kr 文章有更新',
                template: ({ title = '', summary = '', url = '' }) => {
                    const u = new URL(url)

                    if (u.host === 'github.com') {
                        u.host = process.env.GITHUB_HOST2
                    }

                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${u.toString()}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                    `
                },
                device: 'device1',
            },
            getTargetData: () =>
                fetchRSS({
                    source: 'RSS_36KrArticle',
                    field: ['title', 'link', 'content'],
                }),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
