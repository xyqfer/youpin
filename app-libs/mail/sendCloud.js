'use strict';

module.exports = ({ title = '', content = '', receivers = process.env.mailReceivers }) => {
    const rp = require('request-promise');

    const {
        sendCloudApiUser: apiUser,
        sendCloudApiKey: apiKey
    } = process.env;

    return rp.post({
        uri: 'http://api.sendcloud.net/apiv2/mail/send',
        form: {
            'apiUser': apiUser,
            'apiKey': apiKey,
            'from': 'service@sendcloud.im',
            'fromName': '凉凉',
            'to': receivers,
            'subject': title,
            'html': content,
        }
    }).then((result) => {
        const response = JSON.parse(result);
        console.log(response);

        const status = {
            success: true
        };

        if (!response || !response.result) {
            status.success = false;
        }
        return status;
    }).catch((err) => {
        console.error(err);

        return {
            success: false
        };
    });
};