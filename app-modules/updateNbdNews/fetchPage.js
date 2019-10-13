const { crawler, } = require('app-libs');

module.exports = async (data) => {
    return await Promise.mapSeries(data.reverse(), async (item) => {
        const $ = await crawler(item.url);
        const title = $('h1').text();

        $('.n-on-h-more-read').add('.n-on-h-more-read-a').remove();
        const content = $('.g-articl-text').html();

        item.title = title;
        item.content = content;
        return item;
    });
};