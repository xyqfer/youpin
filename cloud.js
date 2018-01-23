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
    }, {
        name: 'refreshUplabsOSS',
        url: '/api/v1/uplabs/refreshOSS',
        info: '更新 uplabs OSS'
    }, {
        name: 'updateCodrop',
        url: '/api/v1/codrop/update',
        info: '更新 Codrop'
    }, {
        name: 'updateGitHubTrending',
        url: '/api/v1/github/trending',
        info: '更新 GitHub Trending'
    }
];

cloudFuncConfig.forEach((func) => {
    AV.Cloud.define(func.name, (request) => {
        const rp = require('request-promise');
        const basePath = process.env.LEANCLOUD_APP_ENV == 'development' ? 'http://localhost:3000' :
            (process.env.LEANCLOUD_APP_ENV == 'production' ? process.env.hostName : process.env.stgHostName);

        rp.get({
            uri: `${basePath}${func.url}`
        });

        return func.info;
    });
});