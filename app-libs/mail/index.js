'use strict';

module.exports = async ({ title = '', data = [], template = () => ('') }) => {
    const sendCloud = require('./sendCloud');
    const sendOutlook = require('./sendOutlook');
    const sendWechat = require('./sendWechat');
    const sendBark = require('./sendBark');
    const params = require('../params');

    const {
        mailReceivers: receivers
    } = process.env;

    const content = data.map((item) => {
        return template(item);
    }).join('');

    const mailQueue = process.env.mailQueue.split(',');

    const sendMap = {
        outlook: sendOutlook,
        wechat: sendWechat,
        sendcloud: sendCloud,
        bark: sendBark,
    };

    const mailParams = {
        title,
        content,
        receivers
    };

    if (params.env.isDev) {
        return {
            success: true
        };
    }

    try {
        let sendSuccess = false;

        while (mailQueue.length > 0 && !sendSuccess) {
            const mapKey = (mailQueue.shift() || 'wechat').toLowerCase();
            const status = await sendMap[mapKey](mailParams);

            if (status.success) {
                sendSuccess = true;
            }
        }

        if (!sendSuccess) {
            console.error(`${title} 消息发送失败`);
            console.log(data);
        }

        return {
            success: sendSuccess
        }
    } catch (err) {
        console.error(err);
        return {
            success: false
        }
    }
};