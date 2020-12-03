'use strict';

module.exports = async ({ title = '', data = [], render = 'archive', device = 'device1', open = 'chrome', template = () => '', proxy = false }) => {
    const cheerio = require('cheerio');
    const sendCloud = require('./sendCloud');
    const sendOutlook = require('./sendOutlook');
    const sendWechat = require('./sendWechat');
    const sendBark = require('./sendBark');
    const sendTelegram = require('./sendTelegram');
    const params = require('../params');
    const { mailReceivers: receivers } = process.env;

    let content = data.map((item) => {
      item.title = item.title.replace(/<\/?select>/gi, '');
      if (item.summary) item.summary = item.summary.replace(/<\/?select>/gi, '');

      return item;
    }).map((item) => template(item, data)).join('');
    const $ = cheerio.load(content);
    $('a').each(function() {
        $(this).attr('target', '_blank');
        $(this).attr('rel', 'noreferrer');
    });
    content = $.html();

    const contentCountMsg = `${data.length}条消息`;

    const mailQueue = process.env.mailQueue.split(',');

    const sendMap = {
        outlook: sendOutlook,
        wechat: sendWechat,
        sendcloud: sendCloud,
        bark: sendBark,
        tg: sendTelegram,
    };

    const mailParams = {
        title: `${title} / ${contentCountMsg}`,
        content,
        receivers,
        render,
        device,
        open,
        proxy,
    };

    if (params.env.isDev) {
        return {
            success: true,
        };
    }

    try {
        let sendSuccess = false;
        /* eslint-disable no-await-in-loop */
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
            success: sendSuccess,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
