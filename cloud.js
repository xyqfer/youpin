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
        name: 'updateV2EXHot',
        url: '/api/v1/v2ex/hot',
        info: '更新 v2ex hot'
    }, {
        name: 'updateDaily',
        url: '/api/v1/update/daily',
        info: '每日更新'
    }, {
        name: 'wake',
        url: '/',
        info: '定时唤醒'
    }
];

cloudFuncConfig.forEach((func) => {
    AV.Cloud.define(func.name, () => {
        const rp = require('request-promise');
        const basePath = process.env.LEANCLOUD_APP_ENV == 'development' ? 'http://localhost:3000' :
            (process.env.LEANCLOUD_APP_ENV == 'production' ? process.env.hostName : process.env.stgHostName);

        rp.get({
            uri: `${basePath}${func.url}`
        });

        return Promise.resolve(func.info);
    });
});