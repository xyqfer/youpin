const url = require('url');
const moment = require('moment');
const { crawler } = require('app-libs');

module.exports = async (req, res) => {
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    try {
        const list = [];
        const date = moment(randomDate(new Date(2006, 9, 9), new Date())).format('YYYY-MM-DD');
        const $ = await crawler(`https://news.ycombinator.com/front?day=${date}`);

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
            if (!site || site === '') site = 'news.ycombinator.com';

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
            msg: `hn random ${date} 获取失败`,
        });
    }
};
