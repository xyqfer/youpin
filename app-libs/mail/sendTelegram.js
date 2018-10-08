'use strict';

module.exports = async ({ title = '', content = '' }) => {
    const saveDbData = require('../db/saveDbData');
    const uuidv4 = require('uuid/v4');
    const rp = require('request-promise');

    const uuid = uuidv4();
    const { tgUrl, tgChatId } = process.env;
    
    try {
        await saveDbData({
            dbName: 'Archive',
            data: [{
                uuid,
                title,
                content
            }]
        });

        const url = `${process.env.hostName}/archive?id=${uuid}`;
        const text = `<a href="${url}">${title}</a>`;
        const result = await rp.post({
            uri: tgUrl,
            form: {
              chat_id: tgChatId,
              text,
              parse_mode: 'HTML'
            }
        });

        const response = JSON.parse(result);

        console.log(response);
        return {
            success: response.ok
        };
    } catch (err) {
        console.error(title, err);
        return {
            success: false
        };
    }
};