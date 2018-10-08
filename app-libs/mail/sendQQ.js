'use strict';

module.exports = async ({ title = '', content = '', receivers = process.env.mailReceivers }) => {
    const nodemailer = require('nodemailer');

    const { mailSender, mailPass } = process.env;
    const transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: mailSender,
            pass: mailPass // 授权码,通过QQ获取
        }
    });

    const mailOptions = {
        from: mailSender, // 发送者
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
        console.error(title, err);
        return {
            success: false
        };
    }
};