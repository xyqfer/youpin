'use strict';
const { http } = require('app-libs');

module.exports = async () => {
    const result = await http.get({
        uri: 'https://api.cntv.cn/list/getWxArticleList?id=PAGEb3A73LquTUFIbR5GjLgg180411&serviceId=lianboplus&date=',
        json: true,
    });
    const data = result.videoList[0];
    console.log(data);

    return [
        {
            title: data.article_title,
            url: data.article_url,
        },
    ];
};
