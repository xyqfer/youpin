'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const sendMail = require('../lib/mail');

    console.log('notifyBook');

    const dbName = 'ChinaPubBooks';
    let query = new AV.Query(dbName);

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    month = month < 10 ? '0' + month : month;

    let date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();

    query.greaterThanOrEqualTo('updatedAt', new Date(`${year}-${month}-${date} 00:00:00`));
    query.doesNotExist('isbn');
    query.limit(1000);

    query.find().then((data) => {
        console.log(data);

        if (data.length > 0) {
            if (process.env.LEANCLOUD_APP_ENV == 'production') {
                let mailContent = '';

                data.forEach((item) => {
                    let bookUrl = `${process.env.hostName}/api/v1/book/redirect?url=${encodeURIComponent(item.get('url'))}`;
                    mailContent += `<a href='${bookUrl}'>${item.get('name')}</a><br><br>`;
                });

                return sendMail({
                    title: '有新书啦',
                    mailContent: mailContent
                });
            } else {
                return data;
            }
        }
    }).then((data) => {
        res.end();
    });
};