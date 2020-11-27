'use strict';

module.exports = async ({ title = '', content = '', render, device = 'device1', open = 'chrome', proxy = false }) => {
    const { saveDbData } = require('../db');
    const { v4: uuidv4 } = require('uuid');
    const rp = require('request-promise');
    const uuid = uuidv4();
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

        let url = '';
        const archiveHost = process.env.ARCHIVE_HOST;
        if (open === 'chrome') {
            const hostName = archiveHost.replace('https://', 'googlechromes://');
            url = `${hostName}/archive?id=${uuid}&render=${render}`;
        } else if (open === 'jsbox') {
            url = 'jsbox://run?name=PrivatePush&url=' + encodeURIComponent(`${archiveHost}/archive?id=${uuid}&render=${render}`);
        } else {
            url = 'jsbox://run?name=safariproxy&url=' + encodeURIComponent(`${proxy ? process.env.proxyUrl : ''}${archiveHost}/archive?id=${uuid}&render=${render}`);
        }
        url = encodeURIComponent(url);

        const response = await rp.get({
            json: true,
            uri: `https://api.day.app/${process.env[device]}/${encodeURIComponent(title)}?url=${url}`,
        });

        console.log(response);
        /* eslint-disable eqeqeq */
        return {
            success: response.code == 200,
        };
    } catch (err) {
        console.error(title, err);
        return {
            success: false,
        };
    }
};
