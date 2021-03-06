'use strict';

/**
 * 获取用户创建主题
 */

module.exports = (req, res) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const url = require('url');
    const { params } = require('app-libs');

    const { name } = req.params;
    const { p = 1 } = req.query;

    const cookie = `A2=${req.cookies.A2 || ''}`;
    rp.get({
        uri: `https://www.v2ex.com/member/${name}/topics?p=${p}`,
        headers: {
            'User-Agent': params.ua.pc,
            Cookie: cookie,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = {
                topic: [],
                total: 1,
            };

            $('#Main > .box')
                .eq(0)
                .find('.cell.item')
                .each(function() {
                    const $elem = $(this);

                    $elem.find('table').each(function() {
                        const $table = $(this);

                        const id = url.parse(
                            $table
                                .find('.item_title > a')
                                .attr('href')
                                .replace(/^\/t\//, '')
                        ).path;

                        const chatData = {
                            id,
                            title: $table.find('.item_title > a').text(),
                            node: $table.find('.node').text(),
                            reply: $table.find('.count_livid').text() || 0,
                            time: (
                                $table
                                    .find('.topic_info')
                                    .text()
                                    .trim()
                                    .split('•')[2] || ''
                            ).trim(),
                        };

                        data.topic.push(chatData);
                    });
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
