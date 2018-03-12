'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const { params } = require('app-libs');

    try {
        const rawData = await rp.post({
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
        });

        return rawData.result.BuildHome.data;
    } catch (err) {
        console.error(err);
        return [];
    }
};
