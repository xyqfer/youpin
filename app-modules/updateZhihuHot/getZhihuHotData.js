'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const {
        params
    } = require('app-libs');

    const result = await rp.get({
        json: true,
        uri: 'https://www.zhihu.com/api/v3/feed/topstory/hot-list-wx?limit=50',
        headers: {
            'User-Agent': params.ua.pc,
        }
    });

    return result.data.map((item) => {
        return {
            title: item.target.title_area.text,
            url: item.target.link.url
        };
    });
};