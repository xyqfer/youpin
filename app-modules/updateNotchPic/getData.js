'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const flatten = require('lodash/flatten');
    const {
        params,
        http,
    } = require('app-libs');

    const urls = [
        'https://notch.qdaily.com/api/v2/wallpaper_topics?last_key=0&platform=ios',
        'https://notch.qdaily.com/api/v2/avatar_topics?platform=ios',
    ];

    const data = await Promise.mapSeries(urls, async (url) => {
        try {
            const result = await http.get({
                json: true,
                uri: url,
                headers: {
                    'User-Agent': params.ua.pc,
                },
            });

            return result.topics.map((item) => {
                return {
                    url: item.id,
                    title: item.title,
                    summary: item.pictures.reduce((acc, picture) => {
                        acc += `
                        <img src="${picture.pic_info.medium}" referrerpolicy="no-referrer">
                        <a href="${picture.pic_info.original}" target="_blank">查看原图</a>
                        <br>
                    `;
                        return acc;
                    }, item.description + '<br>'),
                };
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    });

    return flatten(data);
};