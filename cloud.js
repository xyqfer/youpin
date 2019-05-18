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
        module: ['updateOctocat', 'updateSSpaiMatrix', 'update36krArticle', 'updateBookset', 'updateTerminus', 'updateFraudInfo', 'updateNBD', 'updateEco'],
        info: '每日更新_en'
    },
    {
        name: 'updateKonachan',
        module: ['updateKonachan'],
        info: '更新 Konachan'
    },
    {
        name: 'updateZhihuHot',
        module: ['updateJuejinPinHot'],
        info: '更新 ZhihuHot'
    },
    {
        name: 'update3PerDay',
        module: ['updateWechatAnnounce'],
        info: '每日三更'
    },
    {
        name: 'updateDaily',
        module: ['updateBook', 'updateCodrop', 'updateOSChina', 'updateKelemiao', 'updateNotchPic', 'updateCBNweekly'],
        info: '每日更新'
    },
    {
        name: 'updateBlog',
        module: ['updateBlog', 'updateXincao', 'updateLianbo'],
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
        name: 'updateTicket',
        module: 'updateTicket',
        info: '更新车票'
    },
    {
        name: 'updateJp',
        module: 'updateJp',
        info: '更新语法'
    },
    {
        name: 'updateArticleFragment',
        module: 'updateArticleFragment',
        info: '更新 articleFragment'
    },
    {
        name: 'updateDcard',
        module: 'updateDcard',
        info: '更新 Dcard'
    },
    {
        name: 'updateRSSBot',
        module: 'updateRSSBot',
        info: '更新 updateRSSBot'
    },
    {
        name: 'updateLyca',
        module: 'updateLyca',
        info: '更新 updateLyca'
    },
    {
        name: 'updateAlipayScheme',
        module: 'updateAlipayScheme',
        info: '更新 updateAlipayScheme'
    },
    {
        name: 'updateInitium',
        module: 'updateInitium',
        info: '更新 updateInitium'
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