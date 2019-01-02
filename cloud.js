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
    },
    {
        name: 'updateGZWeather',
        module: 'updateGZWeather',
        info: 'updateGZWeather 定时任务'
    },
    {
        name: 'updateEle',
        module: 'updateEle',
        info: 'updateEle 定时任务'
    },
    {
        name: 'updateMedium',
        module: 'updateMedium',
        info: 'updateMedium 定时任务'
    },
    {
        name: 'updateRandom',
        module: ['updateCat', 'updateSticker', 'updateBilibiliGif'],
        info: '更新 random 内容'
    },
    {
        name: 'updateGitHubAndGitLabTrending',
        module: ['updateGitHubTrending', 'updateGitLabTrending'],
        info: '更新 GitHub Trending && GitLab Trending'
    },
    {
        name: 'updateDaily_en',
        module: ['updateKonachan', 'updateOctocat', 'updateArticleFragment', 'updateTE'],
        info: '每日更新_en'
    },
    {
        name: 'updateZhihuHot',
        module: ['updateZhihuPinHot', 'updateJuejinPinHot'],
        info: '更新 ZhihuHot'
    },
    {
        name: 'update3PerDay',
        module: ['updateJuejin', 'updateEchojs', 'updateWechatAnnounce', 'updateBilibiliRead'],
        info: '每日三更'
    },
    {
        name: 'updateDaily',
        module: ['updateBook', 'updateCodrop', 'updateOSChina', 'updateKelemiao'],
        info: '每日更新'
    },
    {
        name: 'updateBlog',
        module: ['updateBlog', 'updateFanfou'],
        info: '每日更新 blog'
    },
    {
        name: 'updateAppStore',
        module: 'updateAppStore',
        info: '更新 app store'
    },
    {
        name: 'updateLeetcode',
        module: 'updateLeetcode',
        info: '更新 Leetcode'
    },
    {
        name: 'updateArticleFragment',
        module: 'updateArticleFragment',
        info: '更新 articleFragment'
    },
    {
        name: 'wake',
        module: 'wake',
        info: '定时唤醒'
    },
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