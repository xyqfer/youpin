'use strict';

const AV = require('leanengine');

const cloudFuncConfig = [
    {
        name: 'updateYoupin',
        module: 'updateYoupin',
        info: 'updateYoupin 定时任务'
    }, {
        name: 'updateGZWeather',
        module: 'updateGZWeather',
        info: 'updateGZWeather 定时任务'
    }, {
        name: 'updateEle',
        module: 'updateEle',
        info: 'updateEle 定时任务'
    }, {
        name: 'updateMedium',
        module: 'updateMedium',
        info: 'updateMedium 定时任务'
    }, {
        name: 'updateV2EXHot',
        module: 'updateV2EX',
        info: '更新 v2ex hot'
    }, {
        name: 'updateRandom',
        module: ['updateCat', 'updateSticker', 'updateBilibiliGif'],
        info: '更新 random 内容'
    }, {
        name: 'updateGitHubAndGitLabTrending',
        module: ['updateGitHubTrending', 'updateGitLabTrending'],
        info: '更新 GitHub Trending && GitLab Trending'
    },{
        name: 'updateDaily_en',
        module: ['updatePixiv', 'updateDribbble', 'updateKonachan', 'updateUplabs'],
        info: '每日更新_en'
    }, {
        name: 'updateZhihuHot',
        module: ['updateZhihuHot', 'updateZhihuPinHot'],
        info: '更新 ZhihuHot'
    }, {
        name: 'update3PerDay',
        module: ['updateJuejin', 'updateEchojs', 'updateCBNweekly', 'updateWaterSupply', 'updateWechatAnnounce'],
        info: '每日三更'
    }, {
        name: 'updateDaily',
        module: ['updateBook', 'updateCodrop', 'updateLagouComment', 'updateOSChina', 'updateBlog', 'updateKelemiao'],
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

            console.log(module);
        });

        return info;
    });
});