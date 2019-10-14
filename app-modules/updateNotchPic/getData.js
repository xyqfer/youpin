'use strict';

module.exports = async () => {
    const flatten = require('lodash/flatten');
    const { params, http } = require('app-libs');

    const urls = [
        {
            url: 'https://notch.qdaily.com/api/v2/wallpaper_topics?last_key=0&platform=ios',
            key: 'wallpaper',
        },
        {
            url: 'https://notch.qdaily.com/api/v2/avatar_topics?platform=ios',
            key: 'avatar',
        },
    ];

    const data = await Promise.mapSeries(urls, async ({ url, key }) => {
        try {
            const result = await http.get({
                json: true,
                uri: url,
                headers: {
                    'User-Agent': params.ua.pc,
                },
            });

            return result.topics.map((item) => ({
                url: item.id + key,
                title: item.title,
                summary: item.pictures.reduce((acc, picture) => {
                    acc += `
                        <img src="${picture.pic_info.medium}" referrerpolicy="no-referrer">
                        <a href="${picture.pic_info.original}" target="_blank">查看原图</a>
                        <br>
                    `;
                    return acc;
                }, item.description + '<br>'),
            }));
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data);
};
