'use strict';

module.exports = (opt) => {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: process.env.mailSender,
            pass: process.env.mailPass //授权码,通过QQ获取
        }
    });

    let mailHtml = '';
    opt.data.forEach((item) => {
        mailHtml += (`<a href='${item.url}'>${item.name}</a><br><br>`);
    });

    const mailOptions = {
        from: process.env.mailSender, // 发送者
        to: process.env.mailReceivers, // 接受者,可以同时发送多个,以逗号隔开
        subject: opt.title, // 标题
        html: mailHtml
    };

    return transporter.sendMail(mailOptions);
};