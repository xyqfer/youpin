'use strict';
const { http } = require('app-libs');

module.exports = async () => {
    const result = await http.get({
        uri: 'https://api.cntv.cn/list/getWxArticleList?id=PAGEb3A73LquTUFIbR5GjLgg180411&serviceId=lianboplus&date=',
        json: true,
    });
    const data = result.videoList.map((item) => ({
        title: item.article_title,
        url: item.article_url,
    }));

    return data;
};
