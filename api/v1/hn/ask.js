const url = require('url');
const { crawler } = require('app-libs');

module.exports = async (req, res) => {
    try {
        const data = [];
        const baseUrl = 'https://news.ycombinator.com/ask';

        const pages = await Promise.all([
            crawler(baseUrl),
            crawler(baseUrl + '?p=2'),
        ]);
        pages.forEach(($) => {
            $('.itemlist .athing').each(function() {
                const $item = $(this);
                const $link = $item.find('.storylink');
                const title = $link.text();
                const { id } = url.parse($link.attr('href'), true).query;
    
                const $info = $item.next();
                const author = $info.find('.hnuser').text();
                const time = $info.find('.age').text();
                let comments = parseInt($info.find('.subtext > a').last().text());
                if (isNaN(comments)) comments = 0;
    
                data.push({
                    id,
                    title,
                    author,
                    time,
                    comments,
                });
            });
        });

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
