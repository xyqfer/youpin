const url = require('url');
const { crawler } = require('app-libs');

module.exports = async (req, res) => {
    const { page = 1 } = req.query;

    try {
        const list = [];
        const $ = await crawler(`https://news.ycombinator.com/news?p=${page}`);

        const hasNext = $('.morelink').length > 0;
        $('.itemlist .athing').each(function() {
            const $item = $(this);
            const $link = $item.find('.storylink');
            const title = $link.text();
            const link = $link.attr('href');

            const $info = $item.next();
            const author = $info.find('.hnuser').text();
            const $time = $info.find('.age > a'); 
            const time = $time.text();
            const { id } = url.parse($time.attr('href'), true).query;

            let comments = parseInt($info.find('.subtext > a').last().text());
            if (isNaN(comments)) comments = 0;

            let site = $item.find('.sitestr').text();
            if (!site || site === '') {
              site = 'news.ycombinator.com';
            } else {
              const u = new URL(`https://${site}`);
              site = u.host;
            }

            list.push({
                id,
                link,
                site,
                title,
                author,
                time,
                comments,
            });
        });

        res.json({
            success: true,
            data: {
                list,
                hasNext,
            },
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            msg: `hn news ${page} 获取失败`,
        });
    }
};
