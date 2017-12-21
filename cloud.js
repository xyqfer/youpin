const AV = require('leanengine');

const cloudFuncConfig = [
    {
        name: 'youpin_1',
        url: '/api/v1/youpin/update',
        info: 'update_youpin 定时任务'
    }, {
        name: 'ele_restaurant',
        url: '/api/v1/ele/update',
        info: 'update_ele 定时任务'
    }, {
        name: 'update_book',
        url: '/api/v1/book/update',
        info: 'update_book 定时任务'
    }, {
        name: 'book_notify',
        url: '/api/v1/book/notify',
        info: 'notify_book 定时任务'
    }
];

cloudFuncConfig.forEach((func) => {
    AV.Cloud.define(func.name, (request) => {
        const rp = require('request-promise');
        const basePath = process.env.LEANCLOUD_APP_ENV == 'production' ? process.env.hostName : 'http://localhost:3000';

        rp.get({
            uri: `${basePath}${func.url}`
        });

        return func.info;
    });
});