'use strict';

module.exports = async ({ title = '', content = '', receivers = process.env.mailReceivers }) => {
    const nodemailer = require('nodemailer');

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
        to: receivers, // 接受者,可以同时发送多个,以逗号隔开
        subject: title, // 标题
        html: content
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log(result);

        const status = {
            success: false
        };

        if (result.rejected.length === 0) {
            status.success = true;
        }

        return status;
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};