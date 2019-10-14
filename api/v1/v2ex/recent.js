'use strict';

/**
 * 获取最近主题
 */
module.exports = (req, res) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const url = require('url');
    const { params } = require('app-libs');

    const { p = 1 } = req.query;

    const cookie = `A2=${req.cookies.A2 || ''}`;
    rp.get({
        uri: `https://www.v2ex.com/recent?p=${p}`,
        headers: {
            'User-Agent': params.ua.pc,
            Cookie: cookie,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const $container = $('#Main > .box');

            const data = {
                total: +$('.page_normal')
                    .last()
                    .text(),
                count: +$container
                    .find('.header .fade')
                    .text()
                    .replace(/[^0-9]+/g, ''),
                list: [],
            };

            $container.find('.cell.item').each(function() {
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
                        avatar: `https:${$table.find('.avatar').attr('src')}`,
                        title: $table.find('.item_title > a').text(),
                        reply: $table.find('.count_livid').text() || 0,
                        time: (
                            $table
                                .find('.topic_info')
                                .text()
                                .split('•')[2] || ''
                        ).trim(),
                        node: $table.find('.node').text(),
                    };

                    data.list.push(chatData);
                });
            });

            res.json({
                success: true,
                data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: `v2ex recent 获取失败`,
            });
        });
};
