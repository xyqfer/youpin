'use strict';

/**
 * 检查登录情况
 */
module.exports = (req, res) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    const cookie = `A2=${req.cookies.A2 || ''}`;
    rp.get({
        uri: `https://www.v2ex.com`,
        headers: {
            'User-Agent': params.ua.pc,
            Cookie: cookie,
        },
    })
        .then((htmlString) => {
            const $ = cheerio.load(htmlString);

            res.json({
                success: true,
                data: {
                    isLogin:
                        $('#Rightbar > .box')
                            .eq(0)
                            .find('.avatar').length > 0,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: `v2ex checkLogin 获取失败`,
            });
        });
};
