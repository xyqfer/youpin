const { crawler } = require('app-libs');

module.exports = async (data) =>
    await Promise.mapSeries(data.reverse(), async (item) => {
        const $ = await crawler(item.url);
        const title = $('h1').text();

        $('.n-on-h-more-read')
            .add('.n-on-h-more-read-a')
            .remove();
        $('.nbd-mzsm').remove();
        const content = $('.g-articl-text').html();

        item.title = title;
        item.content = content;
        return item;
    });
