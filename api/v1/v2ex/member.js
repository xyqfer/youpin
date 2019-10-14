'use strict';

/**
 * 获取用户信息
 */
module.exports = (req, res) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    const { name } = req.params;

    const cookie = `A2=${req.cookies.A2 || ''}`;
    rp.get({
        uri: `https://www.v2ex.com/member/${name}`,
        headers: {
            'User-Agent': params.ua.pc,
            Cookie: cookie,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const $main = $('#Main');

            const data = {
                avatar: `http:${$main.find('.avatar').attr('src')}`,
                name: $main.find('h1').text(),
                info: $main
                    .find('.box')
                    .eq(0)
                    .find('.gray')
                    .text()
                    .trim()
                    .replace(/今日活跃度排名.*/, ''),
                rank: $main
                    .find('.box')
                    .eq(0)
                    .find('.gray > a')
                    .text()
                    .trim(),
                topic: {
                    has: `/member/${name}/topics/`,
                    reason: '',
                },
                reply: {
                    has: `/member/${name}/replies/`,
                    reason: '',
                },
            };

            const $topicBox = $main.find('.box').eq(1);
            const $replyBox = $main.find('.box').eq(2);

            if ($topicBox.find('.inner').length === 0) {
                data.topic = {
                    has: false,
                    reason: '暂无创建主题',
                };
            } else {
                if ($topicBox.find('.cell.item').length === 0) {
                    data.topic = {
                        has: false,
                        reason: $topicBox
                            .find('.inner .gray')
                            .text()
                            .trim(),
                    };
                }
            }

            if ($replyBox.find('.dock_area').length === 0) {
                data.reply = {
                    has: false,
                    reason: '暂无创建回复',
                };
            }

            res.json({
                success: true,
                data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: `v2ex ${name} member 获取失败`,
            });
        });
};
