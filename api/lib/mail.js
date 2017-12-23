'use strict';

module.exports = (opt) => {
    const nodemailer = require('nodemailer');

    const mailSender = process.env.mailSender;
    const mailPass = process.env.mailPass;
    const mailReceivers = process.env.mailReceivers;
    const mailTitle = opt.title;
    const mailContent = opt.mailContent;

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

    return transporter.sendMail(mailOptions);
};