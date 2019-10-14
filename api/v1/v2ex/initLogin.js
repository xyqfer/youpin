'use strict';

/**
 * 登录初始化
 */
module.exports = (req, res) => {
    const rp = require('request-promise').defaults({
        jar: true,
    });
    const cheerio = require('cheerio');
    const { params } = require('app-libs');

    rp.get({
        uri: 'https://www.v2ex.com/signin',
        resolveWithFullResponse: true,
        headers: {
            'User-Agent': params.ua.pc,
        },
    })
        .then((response) => {
            const $ = cheerio.load(response.body);
            const cookie = response.headers['set-cookie'][0].replace(/; expires=.*/, '').trim();
            const data = {
                cookie,
            };
            const $form = $('form').eq(1);

            $form.find('.sl').each(function(index) {
                data[index] = $(this).attr('name');
            });

            data.once = $form.find("[name='once']").val();
            const captcha = `https://www.v2ex.com/_captcha?once=${data.once}`;

            rp.get({
                uri: captcha,
                resolveWithFullResponse: true,
                encoding: 'binary',
                headers: {
                    'User-Agent': params.ua.pc,
                    Cookie: cookie,
                },
            })
                .then((resp) => {
                    data.captcha = 'data:image/png;base64,' + Buffer.from(resp.body, 'binary').toString('base64');
                    res.json({
                        success: true,
                        data,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: 'v2ex init login 失败',
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'v2ex init login 失败',
            });
        });
};
