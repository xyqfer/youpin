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
                open: 'safari',
                device: 'device3',
                proxy: false,
            },
            getTargetData: () =>
                fetchRSS({
                    source: 'RSS_HN',
                    field: ['title', 'link', 'content'],
                    map: (item) => {
                        const { link, content } = item;
                        const $ = cheerio.load(content);
                        const $img = $('img');

                        if ($img && $img.length > 0) {
                            $img.removeAttr('style');
                            $img.each(function() {
                                const $item = $(this);
                                $item.attr('src', process.env.IMAGE_PROXY + encodeURIComponent($item.attr('src')));
                                $item.attr('referrerpolicy', 'no-referrer');
                            });
                        }

                        item.url = link;
                        item.summary = $.html();
                        
                        delete item.link;
                        delete item.content;
                        return item;
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
