'use strict';

module.exports = async ({ title = '', content = '' }) => {
    const saveDbData = require('../db/saveDbData');
    const uuidv4 = require('uuid/v4');
    const rp = require('request-promise');

    const uuid = uuidv4();
    const scToken = process.env.scToken;
    
    try {
        await saveDbData({
            dbName: 'Archive',
            data: [{
                uuid,
                title,
                content
            }]
        });

        let markdownContent = `- [${title}](${process.env.hostName}/archive?id=${uuid})`;
        const response = await rp.post({
            json: true,
            uri: `https://sc.ftqq.com/${scToken}.send`,
            form: {
                text: title,
                desp: markdownContent
            }
        });

        console.log(response);
        return {
            success: response.errno == 0
        };
    } catch (err) {
        console.error(title, err);
        return {
            success: false
        };
    }
};