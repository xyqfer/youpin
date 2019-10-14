'use strict';

module.exports = async () => {
    const {
        params,
        telegram: { sendMessage },
        http,
    } = require('app-libs');

    try {
        const page1 = await http.get({
            uri: `${process.env.hostName}/api/v1/sticker/all`,
            json: true,
            headers: {
                'User-Agent': params.ua.pc,
            },
        });
        const page = Math.floor(Math.random() * page1.data.last + 1);

        const {
            data: { stickers },
        } = await http.get({
            uri: `${process.env.hostName}/api/v1/sticker/all?page=${page}`,
            json: true,
            headers: {
                'User-Agent': params.ua.pc,
            },
        });
        const index = Math.floor(Math.random() * stickers.length);
        const { uuid, count, name } = stickers[index];
        const fileIndex = Math.floor(Math.random() * count + 1);
        const file = `https://s.tcdn.co/${uuid.slice(0, 3)}/${uuid.slice(3, 6)}/${uuid}/${fileIndex}.png`;

        const response = await sendMessage({
            text: `<a href="${file}" target="_blank">${name}</a>`,
        });

        return response;
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
