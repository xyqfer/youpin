'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const {
        params,
        telegram: { sendMessage },
    } = require('app-libs');

    try {
        const { file } = await rp.get({
            uri: 'http://aws.random.cat/meow',
            json: true,
            headers: {
                'User-Agent': params.ua.pc,
            },
        });

        const response = await sendMessage({
            text: `<a href="${file}" target="_blank">${file}</a>`,
        });

        return response;
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
