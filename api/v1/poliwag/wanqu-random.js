'use strict';

module.exports = (req, res) => {
    const http = require('./utils/http');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    http.get({
        uri: 'https://wanqu.co/random/',
        headers: {
            'User-Agent': params.ua.pc,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);
            const article = {
                title: $('.panel-heading > h1').text(),
                url: $('.panel-body a').attr('href'),
                summary: $('.lead').text(),
            };

            res.json({
                success: true,
                data: [article],
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'wanqu-random 获取失败',
            });
        });
};
