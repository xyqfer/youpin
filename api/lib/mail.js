'use strict';

module.exports = (opt) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const nodemailer = require('nodemailer');
    const cheerio = require('cheerio');

    const mailReceivers = process.env.mailReceivers;
    const mailTitle = opt.title;
    const mailContent = opt.mailContent;

    const sendQQ = () => {
        const mailSender = process.env.mailSender;
        const mailPass = process.env.mailPass;

        let transporter = nodemailer.createTransport({
            service: 'qq',
            auth: {
                user: mailSender,
                pass: mailPass // 授权码,通过QQ获取
            }
        });

        const mailOptions = {
            from: mailSender, // 发送者
            to: mailReceivers, // 接受者,可以同时发送多个,以逗号隔开
            subject: mailTitle, // 标题
            html: mailContent
        };

        return transporter.sendMail(mailOptions).then((result) => {
            console.log(result);

            const status = {
                success: false
            };

            if (result.rejected.length === 0) {
                status.success = true;
            }

            return status;
        }).catch((err) => {
            console.log(err);

            return {
                success: false
            };
        });
    };

    const sendCloud = () => {
        const apiUser = process.env.sendCloudApiUser;
        const apiKey = process.env.sendCloudApiKey;

        return rp.post({
            uri: 'http://api.sendcloud.net/apiv2/mail/send',
            form: {
                'apiUser': apiUser,
                'apiKey': apiKey,
                'from': 'service@sendcloud.im',
                'fromName': '凉凉',
                'to': mailReceivers,
                'subject': mailTitle,
                'html': mailContent,
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
            console.log(err);

            return {
                success: false
            };
        });
    };

    const sendOutlook = () => {
        const outlookMail = process.env.outlookMail;
        const outlookPass = process.env.outlookPass;

        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com', // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            auth: {
                user: outlookMail,
                pass: outlookPass
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        const mailOptions = {
            from: outlookMail, // 发送者
            to: mailReceivers, // 接受者,可以同时发送多个,以逗号隔开
            subject: mailTitle, // 标题
            html: mailContent
        };

        return transporter.sendMail(mailOptions).then((result) => {
            console.log(result);

            const status = {
                success: false
            };

            if (result.rejected.length === 0) {
                status.success = true;
            }

            return status;
        }).catch((err) => {
            console.log(err);

            return {
                success: false
            };
        });
    };

    const sendWechat = () => {
        const scToken = process.env.scToken;
        let markdownContent = '';

        const $ = cheerio.load(mailContent);

        $('a').each(function () {
            const url = $(this).attr('href');
            const title = $(this).text();

            markdownContent += `- [${title}](${url})
`;
        });

        return rp.post({
            uri: `https://sc.ftqq.com/${scToken}.send`,
            form: {
                text: mailTitle,
                desp: markdownContent
            }
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    };

    (async () => {
        const sendCloudStatus = await sendCloud();

        if (!sendCloudStatus.success) {
            const sendOutlookStatus = await sendOutlook();

            if (!sendOutlookStatus.success) {
                await sendWechat();
            }
        }
    })();
};