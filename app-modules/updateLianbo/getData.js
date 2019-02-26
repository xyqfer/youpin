'use strict';

module.exports = async () => {
    const {
        params,
        http,
    } = require('app-libs');

    const result = await http.get({
        uri: 'https://api.cntv.cn/list/getWxArticleList?id=PAGEb3A73LquTUFIbR5GjLgg180411&serviceId=lianboplus&date=',
        headers: {
            'User-Agent': params.ua.pc
        },
        json: true,
    });
    const data = result.videoList[0];

    return {
        title: data.article_title,
        url: data.article_url,
    };
};