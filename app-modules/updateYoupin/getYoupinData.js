'use strict';

module.exports = () => {
    const rp = require('request-promise');
    const { params } = require('app-libs');

    return rp.post({
        json: true,
        uri: 'https://shopapi.io.mi.com/app/shopv3/pipe',
        headers: {
            'User-Agent': params.ua.youpin,
            'Content-Type': 'application/json'
        },
        body: {
            'BuildHome': {
                model: 'Homepage',
                action: 'BuildHome',
                parameters: {
                    id: 153
                }
            }
        }
    }).then((rawData) => {
        return rawData.result.BuildHome.data;
    }).catch((err) => {
        console.error(err);
        return [];
    });
};
