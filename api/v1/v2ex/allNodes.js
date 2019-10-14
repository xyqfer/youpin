'use strict';

/**
 * 获取全部节点
 */
module.exports = (req, res) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    rp.get({
        uri: 'https://www.v2ex.com/planes',
        headers: {
            'User-Agent': params.ua.pc,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const data = [];

            $('#Main > .box')
                .slice(1)
                .each(function() {
                    const $elem = $(this);
                    const $header = $elem.find('.header');

                    const nodeData = {
                        groupName: $header.text().slice(0, $header.text().indexOf($header.find('.fr.fade').text())),
                        nodes: [],
                    };

                    $elem.find('.inner > .item_node').each(function() {
                        const $link = $(this);

                        nodeData.nodes.push({
                            name: $link.text(),
                            url: $link.attr('href'),
                        });
                    });

                    data.push(nodeData);
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
                msg: 'v2ex all-nodes 获取失败',
            });
        });
};
