'use strict';

module.exports = (req, res, next) => {
    const AV = require('leanengine');
    const sendMail = require('../lib/mail');

    const dbName = 'ChinaPubBooks';
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
                return sendMail({
                    data: data.map((item) => {
                        return {
                            name: item.get('name'),
                            url: item.get('url')
                        }
                    }),
                    title: '有新书啦'
                });
            } else {
                console.log(data);
                return data;
            }
        }
    }).then((data) => {
        res.end();
    });
};