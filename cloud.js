'use strict';

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
        module: 'updateV2EX',
        info: '更新 v2ex hot'
    }, {
        name: 'updateJuejin',
        module: 'updateJuejin',
        info: '更新 juejin'
    }, {
        name: 'updateDaily',
        module: ['updateBook', 'updateCodrop', 'updateGitHubTrending'],
        info: '每日更新'
    }, {
        name: 'wake',
        module: 'wake',
        info: '定时唤醒'
    }
];

cloudFuncConfig.forEach((config) => {
    const { name, module, info } = config;

    AV.Cloud.define(name, () => {
        const modules = Array.isArray(module) ? module : [module];
        modules.forEach((module) => {
            const func = require(`./app-modules/${module}`);
            func && func();
        });

        return info;
    });
});