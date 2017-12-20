'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');

    let dbName = 'ChinaPubBooks';
    let query = new AV.Query(dbName);

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? '0' + month : month;

    let date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();

    query.greaterThanOrEqualTo('updatedAt', new Date(`${year}-${month}-${date} 00:00:00`));

    query.limit(1000);
    query.find().then((data) => {
        if (data.length > 0) {
            if (process.env.LEANCLOUD_APP_ENV == 'production') {
                let transporter = nodemailer.createTransport({
                    service: 'qq',
                    auth: {
                        user: process.env.mailSender,
                        pass: process.env.mailPass //授权码,通过QQ获取
                    }
                });

                let mailHtml = "";
                data.forEach(function (item) {
                    mailHtml += (`<a href="${item.get("url")}">${item.get("name")}</a><br><br>`);
                });

                const mailOptions = {
                    from: process.env.mailSender, // 发送者
                    to: process.env.mailReceivers, // 接受者,可以同时发送多个,以逗号隔开
                    subject: '有新书啦', // 标题
                    html: mailHtml
                };

                return transporter.sendMail(mailOptions);
            } else {
                console.log(data);
                return data;
            }
        }
    }).then((data) => {
        res.end();
    });
};