'use strict';
const updateContainer = require('app-containers/update');
const fetchRSS = require('app-containers/fetchRSS');

module.exports = async () => {
    const dbName = 'DoubanBook';
    const filterKey = 'url';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Kobo 有新书',
                template: ({ name = '', url = '', desc = '' }) => `
                    <div style="margin-bottom: 30px">
                        <a href="${url}" target="_blank">
                            <h4>${name}</h4>
                        </a>
                        <div>
                            ${desc}
                        </div>
                    </div>
                `,
                open: 'chrome',
                proxy: false,
            },
            getTargetData: () =>
                fetchRSS({
                    source: 'RSS_KoboBook',
                    field: ['title', 'link', 'content'],
                    map: (item) => {
                        const url = item.link;
                        const cover = '';
                        const name = item.title;
                        const desc = item.content;
                        const pubInfo = '';

                        return {
                            url,
                            cover,
                            name,
                            desc,
                            pubInfo,
                        };
                    },
                }),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
