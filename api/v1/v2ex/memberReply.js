'use strict';

/**
 * 获取用户回复
 */

module.exports = (req, res) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');
    const convertContent = require('./utils/convertContent');

    const { name } = req.params;
    const { p = 1 } = req.query;

    rp.get({
        uri: `https://www.v2ex.com/member/${name}/replies?p=${p}`,
        headers: {
            'User-Agent': params.ua.pc,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = {
                reply: [],
                total: 1,
            };

            const $container = $('#Main > .box').eq(0);
            const $questions = $container.find('.dock_area');
            const $replies = $container.find('.reply_content');

            $questions.each(function(index) {
                const $elem = $(this);

                const replyData = {
                    received: {
                        author: $elem
                            .find('a')
                            .eq(0)
                            .text(),
                        node: {
                            name: $elem
                                .find('a')
                                .eq(1)
                                .text(),
                            url: $elem
                                .find('a')
                                .eq(1)
                                .attr('href'),
                        },
                        topic: {
                            title: $elem
                                .find('a')
                                .eq(2)
                                .text(),
                            url: $elem
                                .find('a')
                                .eq(2)
                                .attr('href'),
                        },
                        content: `${$elem
                            .find('a')
                            .eq(2)
                            .text()} <div><a href="${$elem
                            .find('a')
                            .eq(2)
                            .attr('href')}">查看</a></div>`,
                    },
                    sent: {
                        content: convertContent($replies.eq(index).html()).content,
                        time: $elem.find('.fr > .fade').text() || '',
                    },
                };

                data.reply.push(replyData);
            });

            const $pageInput = $('.page_input');

            if ($pageInput.length > 0) {
                data.total = +$pageInput.attr('max');
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
                msg: `v2ex ${name} member topic 获取失败`,
            });
        });
};
