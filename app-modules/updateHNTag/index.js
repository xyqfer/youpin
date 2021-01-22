'use strict';
const updateContainer = require('app-containers/update');
const fetchRSS = require('app-containers/fetchRSS');
const { createLinkPreview, http } = require('app-libs');

module.exports = async () => {
    const filterKey = 'url';
    const dbName = 'Konachan';
    let hasCreateLinkPreview = false;

    http.get(process.env.SCREENSHOT_URL2);

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'hn-show 有更新',
                template: ({ title = '', summary = '', url = '' }, data) => {
                  if (!hasCreateLinkPreview) {
                    hasCreateLinkPreview = true;
                    const urls = data.map((item) => item.url);
                    createLinkPreview(urls, 'HN');
                  }

                  return `
                    <div style="margin-bottom: 30px">
                        <a href="${url}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                        <div>
                            <style>pre {width: initial !important;}</style>
                            ${summary}
                        </div>
                    </div>
                  `;
                },
                device: 'device1',
                open: 'safari'
            },
            getTargetData: () =>
                fetchRSS({
                    source: 'RSS_HN',
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
