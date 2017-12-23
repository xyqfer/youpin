const AV = require('leanengine');

const cloudFuncConfig = [
    {
        name: 'updateYoupin',
        url: '/api/v1/youpin/update',
        info: 'updateYoupin 定时任务'
    }, {
        name: 'updateEle',
        url: '/api/v1/ele/update',
        info: 'updateEle 定时任务'
    }, {
        name: 'updateBook',
        url: '/api/v1/book/update',
        info: 'updateBook 定时任务'
    }, {
        name: 'notifyBook',
        url: '/api/v1/book/notify',
        info: 'notifyBook 定时任务'
    }, {
        name: 'traceBook',
        url: '/api/v1/book/trace',
        info: 'traceBook 定时任务'
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