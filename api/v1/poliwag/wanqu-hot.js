'use strict';

module.exports = (req, res) => {
    const http = require('./utils/http');
    const { params } = require('app-libs');
    const parseWanquList = require('./utils/parseWanquList');

    http.get({
        uri: 'https://wanqu.co/hot/',
        headers: {
            'User-Agent': params.ua.pc,
        },
    })
        .then((htmlString) => {
            res.json({
                success: true,
                data: parseWanquList(htmlString),
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'wanqu-hot 获取失败',
            });
        });
};
