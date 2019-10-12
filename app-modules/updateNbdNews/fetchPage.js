const { crawler, } = require('app-libs');

module.exports = async (data) => {
    return await Promise.mapSeries(data, async (item) => {
        const $ = await crawler(item.url);
        const title = $('h1').text();

        $('.n-on-h-more-read').add('.n-on-h-more-read-a').remove();
        $('.g-articl-text p').last().remove();
        const content = $('.g-articl-text').html();

        item.title = title;
        item.content = content;
        return item;
    });
};