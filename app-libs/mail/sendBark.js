'use strict';

module.exports = async ({ title = '', content = '', render, device = 'device1', open = 'chrome' }) => {
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

        let hostName = process.env.hostName;
        if (open === 'chrome') {
            hostName = process.env.hostName.replace('https://', 'googlechromes://');
        }
        const url = encodeURIComponent(`${hostName}/archive?id=${uuid}&render=${render}`);
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