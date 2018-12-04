'use strict';

module.exports = async () => {
    const {
        params,
        telegram: {
          sendMessage
        },
        http
    } = require('app-libs');

    try {
        let page1 = await http.get({
          uri: `${process.env.hostName}/api/v1/sticker/all`,
          json: true,
          headers: {
            'User-Agent': params.ua.pc,
          }
        });
        let page = Math.floor(Math.random() * page1.data.last + 1);

        let { data: { stickers } } = await http.get({
          uri: `${process.env.hostName}/api/v1/sticker/all?page=${page}`,
          json: true,
          headers: {
            'User-Agent': params.ua.pc,
          }
        });
        let index = Math.floor(Math.random() * stickers.length);
        let { uuid, count, name } = stickers[index];
        let fileIndex = Math.floor(Math.random() * count + 1);
        let file = `https://s.tcdn.co/${uuid.slice(0, 3)}/${uuid.slice(3, 6)}/${uuid}/${fileIndex}.png`;

        const response = await sendMessage({
          text: `<a href="${file}" target="_blank">${name}</a>`
        });

        return response;
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};