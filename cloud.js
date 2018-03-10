const AV = require('leanengine');

const cloudFuncConfig = [
    {
        name: 'updateYoupin',
        module: 'updateYoupin',
        info: 'updateYoupin 定时任务'
    }, {
        name: 'updateEle',
        module: 'updateEle',
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

cloudFuncConfig.forEach((config) => {
    const { name, module, info } = config;

    AV.Cloud.define(name, () => {
        const cloudFunc = require(`./app-modules/${module}`);
        cloudFunc && cloudFunc();

        return Promise.resolve(info);
    });
});