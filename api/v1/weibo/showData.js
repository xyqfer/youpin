'use strict';

module.exports = async (req, res) => {
    const { params, http } = require('app-libs');
    const { bid, uid } = req.query;

    try {
        const result = await http.get({
            uri: `https://m.weibo.cn/statuses/show?id=${bid}`,
            json: true,
            headers: {
                Referer: `https://m.weibo.cn/u/${uid}`,
                'MWeibo-Pwa': 1,
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': params.ua.mobile,
            },
        });

        if (result.ok === 1) {
            res.json({
                success: true,
                data: {
                    html: result.data.text,
                },
            });
        } else {
            res.json({
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
        });
    }
};
