'use strict';

module.exports = async ({ title = '', content = '', render, device = 'device1' }) => {
    const saveDbData = require('../db/saveDbData');
    const uuidv4 = require('uuid/v4');
    const rp = require('request-promise');
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

        const url = encodeURIComponent(`${process.env.hostName.replace('https://', 'googlechromes://')}/archive?id=${uuid}&render=${render}`);
        const response = await rp.get({
            json: true,
            uri: `https://api.day.app/${process.env[device]}/${encodeURIComponent(title)}?url=${url}`,
        });

        console.log(response);
        return {
            success: response.code == 200
        };
    } catch (err) {
        console.error(title, err);
        return {
            success: false
        };
    }
};