'use strict';

const AV = require('leanengine');
const Promise = require('bluebird');
const {
    http
} = require('app-libs');

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
        module: ['updateV2EX', 'updateFanfou'],
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
        module: ['updateKonachan', 'updateOctocat'],
        info: '每日更新_en'
    }, {
        name: 'updateZhihuHot',
        module: ['updateZhihuHot', 'updateZhihuPinHot', 'updateJuejinPinHot'],
        info: '更新 ZhihuHot'
    }, {
        name: 'update3PerDay',
        module: ['updateJuejin', 'updateEchojs', 'updateCBNweekly', 'updateWaterSupply', 'updateWechatAnnounce'],
        info: '每日三更'
    }, {
        name: 'updateDaily',
        module: ['updateBook', 'updateCodrop', 'updateOSChina', 'updateKelemiao'],
        info: '每日更新'
    }, {
        name: 'updateBlog',
        module: ['updateBlog', 'updateAppStore', 'update36KrNext'],
        info: '每日更新 blog'
    }, {
        name: 'updateAppStore',
        module: 'updateAppStore',
        info: '更新 app store'
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
        Promise.each(modules, (module) => {
            const func = require(`./app-modules/${module}`) || function () {};
            console.log(module);
            return func();
        }).then(() => {

        }).catch((err) => {
            console.error(err);
        })

        return info;
    });
});

AV.Cloud.define('execCloud', (req) => {
    const { name, params = {} } = req.params;
    http.post({
        uri: `${process.env.cloudUrl}${name}`,
        headers: {
            'x-avoscloud-application-id': process.env.appId || '',
            'x-avoscloud-application-key': process.env.appKey || '',
        },
        body: params,
        json: true,
    });
    return `execCloud: ${name}`;
});