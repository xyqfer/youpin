'use strict';

module.exports = async ({ title = '', content = '', render }) => {
    const { saveDbData } = require('../db');
    const { v4: uuidv4 } = require('uuid');
    const rp = require('request-promise');

    const uuid = uuidv4();
    const scToken = process.env.scToken;
    console.log(`${title}: ${uuid}`);

    try {
        await saveDbData({
            dbName: 'Archive',
            data: [
                {
                    uuid,
                    title,
                    content,
                },
            ],
        });

        const markdownContent = `- [${title}](${process.env.hostName}/archive?id=${uuid}&render=${render})`;
        const response = await rp.post({
            json: true,
            uri: `https://sc.ftqq.com/${scToken}.send`,
            form: {
                text: title,
                desp: markdownContent,
            },
        });

        console.log(response);
        /* eslint-disable eqeqeq */
        return {
            success: response.errno == 0,
        };
    } catch (err) {
        console.error(title, err);
        return {
            success: false,
        };
    }
};
