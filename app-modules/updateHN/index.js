'use strict';
const updateContainer = require('app-containers/update');
const fetchRSS = require('app-containers/fetchRSS');
const cheerio = require('cheerio');

module.exports = async () => {
    const dbName = 'RSSData2';
    const filterKey = 'url';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'HN 有新内容',
                template: ({ title = '', summary = '', url = '' }) => `
                    <div style="margin-bottom: 30px">
                        <a href="${url}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                        <div>
                            ${summary}
                        </div>
                    </div>
                `,
                open: 'chrome',
                proxy: false,
            },
            getTargetData: () =>
                fetchRSS({
                    source: 'RSS_HN',
                    field: ['title', 'link', 'content'],
                    map: (item) => {
                        const { title, link, content } = item;
                        const $ = cheerio.load(content);
                        $('img').removeAttr('style');

                        return {
                            title,
                            link,
                            summary: $.html(),
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
