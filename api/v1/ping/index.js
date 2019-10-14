'use strict';

module.exports = (req, res) => {
    const { params, http } = require('app-libs');
    const { url } = req.query;

    http.get({
        uri: url,
        headers: {
            'User-Agent': params.ua.pc,
        },
    })
        .then((htmlString) => {
            res.send(htmlString);
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: '获取失败',
            });
        });
};
