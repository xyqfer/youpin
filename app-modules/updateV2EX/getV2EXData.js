'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const { params } = require('app-libs');

    const data = await rp.get({
        json: true,
        uri: 'https://www.v2ex.com/api/topics/hot.json',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });

    return data.map((item) => ({
        postId: item.id,
        url: item.url,
        title: item.title,
        content: item.content,
    }));
};
