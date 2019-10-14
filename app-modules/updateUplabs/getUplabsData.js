'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const { params } = require('app-libs');

    const result = await rp.get({
        json: true,
        uri: 'https://www.uplabs.com/all.json?days_ago=1',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });

    return result.map(({ name, animated_teaser_url, link_url }) => ({
        title: name,
        url: link_url,
        summary: `<img referrerpolicy="no-referrer" src="${animated_teaser_url}">`,
    }));
};
