'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const {
        params
    } = require('app-libs');

    const result = await rp.get({
        json: true,
        uri: 'https://rsshub.app/gitlab/explore/trending.json',
        headers: {
            'User-Agent': params.ua.pc,
        }
    });

    return result.items.map(({ title, summary, url }) => {
        return {
            title,
            url,
            summary,
        };
    });
};