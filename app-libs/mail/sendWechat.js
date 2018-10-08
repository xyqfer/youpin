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
        const result = await rp.post({
            uri: `https://sc.ftqq.com/${scToken}.send`,
            form: {
                text: title,
                desp: markdownContent
            }
        });

        console.log(result);
        return {
            success: true
        };
    } catch (err) {
        console.error(title, err);
        return {
            success: false
        };
    }
};