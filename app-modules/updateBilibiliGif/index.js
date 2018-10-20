'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const {
        params,
        telegram: {
          sendMessage
        }
    } = require('app-libs');

    try {
        let { fix: gifList } = await rp.get({
          uri: 'https://www.bilibili.com/index/index-icon.json',
          json: true,
          headers: {
            'User-Agent': params.ua.pc,
          }
        });
        const length = gifList.length;
        const gifItem = gifList[Math.floor(Math.random() * length)];

        const response = await sendMessage({
          text: `<a href="https:${gifItem.icon}">${gifItem.title}</a>`
        });

        return response;
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};