const url = require('url');
const { crawler } = require('app-libs');

module.exports = async (req, res) => {
    try {
        const $ = await crawler('https://news.ycombinator.com/ask');

        const data = $('.itemlist .athing').map(function() {
            const $item = $(this);
            const $link = $item.find('.storylink');
            const title = $link.text();
            const { id } = url.parse($link.attr('href'), true).query;

            const $info = $item.next();
            const author = $info.find('.hnuser').text();
            const time = $info.find('.age').text();
            let comments = parseInt($info.find('.subtext > a').last().text());
            if (isNaN(comments)) comments = 0;

            return {
                id,
                title,
                author,
                time,
                comments,
            };
        }).get();

        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            msg: 'hn ask 获取失败',
        });
    }
};
