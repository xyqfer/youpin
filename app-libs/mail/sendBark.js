'use strict';

module.exports = async ({ title = '', content = '' }) => {
    const saveDbData = require('../db/saveDbData');
    const uuidv4 = require('uuid/v4');
    const rp = require('request-promise');

    const uuid = uuidv4();
    const { barkUrl } = process.env;
    
    try {
        await saveDbData({
            dbName: 'Archive',
            data: [{
                uuid,
                title,
                content
            }]
        });

        const url = encodeURIComponent(`${process.env.hostName}/archive?id=${uuid}`);
        const response = await rp.get({
            json: true,
            uri: `${barkUrl}${encodeURIComponent(title)}?url=${url}`,
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