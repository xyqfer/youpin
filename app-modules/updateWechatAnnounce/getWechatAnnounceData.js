'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const {
        params
    } = require('app-libs');

    const htmlString = await rp.get({
        uri: 'https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncementlist&lang=zh_CN',
        headers: {
            'User-Agent': params.ua.pc
        }
    });

    const messages = [];
    const $ = cheerio.load(htmlString);

    $('.mp_news_list > .mp_news_item').each(function () {
        const $item = $(this);
        const $link = $item.find('a');
        const title = `${$item.find('.read_more').text()}-${$item.find('strong').text()}`;

        messages.push({
            title,
            url: `https://mp.weixin.qq.com${$link.attr('href')}`
        });
    });

    return messages;
};