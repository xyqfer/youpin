'use strict';

module.exports = async ({ title = '', content = '', render }) => {
    const uuidv4 = require('uuid/v4');
    const saveDbData = require('../db/saveDbData');
    const sendMessage = require('../telegram/sendMessage');
    const uuid = uuidv4();

    try {
        await saveDbData({
            dbName: 'Archive',
            data: [{
                uuid,
                title,
                content
            }]
        });

        const url = `${process.env.hostName}/archive?id=${uuid}&render=${render}`;
        const text = `<a href="${url}">${title}</a>`;
        const response = await sendMessage({ text });

        console.log(response);
        return {
            success: response.success
        };
    } catch (err) {
        console.error(title, err);
        return {
            success: false
        };
    }
};