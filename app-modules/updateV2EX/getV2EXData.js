'use strict';

module.exports = () => {
    const rp = require('request-promise');
    const { params } = require('app-lib');

    return rp.get({
        json: true,
        uri: 'https://www.v2ex.com/api/topics/hot.json',
        headers: {
            'User-Agent': params.ua.pc
        }
    }).then((data) => {
        return data.map((item) => {
            return {
                postId: item.id,
                url: item.url,
                title: item.title,
                content: item.content
            };
        });
    }).catch((err) => {
        console.error(err);
        return [];
    });
};