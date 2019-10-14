'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const { params } = require('app-libs');

    const result = await rp.get({
        json: true,
        uri: 'https://api.pixiv.moe/v1/ranking?page=1',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });

    return result.response.works.map(({ work }) => ({
        workId: work.id + '',
        title: work.title,
        url: work.image_urls.large,
        img: work.image_urls.large,
    }));
};
