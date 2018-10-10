'use strict';

module.exports = async ({ text = '' }) => {
    const rp = require('request-promise');
    const { tgUrl, tgChatId } = process.env;
    
    try {
        const response = await rp.post({
            json: true,
            uri: tgUrl,
            form: {
              chat_id: tgChatId,
              text,
              parse_mode: 'HTML'
            }
        });

        console.log(response);
        return {
            success: response.ok
        };
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};