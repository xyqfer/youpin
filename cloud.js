'use strict';

const AV = require('leanengine');

const cloudFuncConfig = [
    {
        name: 'updateYoupin',
        module: 'updateYoupin',
        info: 'updateYoupin 定时任务',
    },
    {
        name: 'updateGZWeather',
        module: 'updateGZWeather',
        info: 'updateGZWeather 定时任务',
    },
    {
        name: 'updateEle',
        module: 'updateEle',
        info: 'updateEle 定时任务',
    },
    {
        name: 'updateMedium',
        module: 'updateMedium',
        info: 'updateMedium 定时任务',
    },
    {
        name: 'updateRandom',
        module: ['updateCat', 'updateSticker', 'updateBilibiliGif'],
        info: '更新 random 内容',
    },
    {
        name: 'updateGitHubAndGitLabTrending',
        module: ['updateGitHubTrending'],
        info: '更新 GitHub Trending && GitLab Trending',
    },
    {
        name: 'updateDaily_en',
        module: ['updateOctocat', 'updateSSpaiMatrix', 'update36krArticle', 'updateFraudInfo', 'updateNBD', 'updateHNTag', 'updateYoutube'],
        info: '每日更新_en',
    },
    {
        name: 'update36krArticle',
        module: ['update36krArticle'],
        info: '更新 update36krArticle',
    },
    {
        name: 'updateZhihuHot',
        module: [],
        info: '更新 ZhihuHot',
    },
    {
        name: 'update3PerDay',
        module: ['updateWechatAnnounce', 'updateJpAnnounce', 'updateNbdNews', 'updateQX'],
        info: '每日三更',
    },
    {
        name: 'updateDaily',
        module: ['updateBook', 'updateCBNweekly', 'updateTerminus'],
        info: '每日更新',
    },
    {
        name: 'updateBlog',
        module: ['updateBlog', 'updateXincao', 'updateLearn'],
        info: '每日更新 blog',
    },
    {
        name: 'updateXincao',
        module: 'updateXincao',
        info: '更新 updateXincao',
    },
    {
        name: 'updateQX',
        module: 'updateQX',
        info: '更新 updateQX',
    },
    {
        name: 'updateCounter',
        module: 'updateCounter',
        info: '更新 updateCounter',
    },
    {
        name: 'updateLianbo',
        module: 'updateLianbo',
        info: '更新 updateLianbo',
    },
    {
        name: 'updateAppStore',
        module: 'updateAppStore',
        info: '更新 app store',
    },
    {
        name: 'updateLeetcode',
        module: 'updateLeetcode',
        info: '更新 Leetcode',
    },
    {
        name: 'updateTicket',
        module: 'updateTicket',
        info: '更新车票',
    },
    {
        name: 'updateJpGrammar',
        module: 'updateJpGrammar',
        info: '更新语法',
    },
    {
        name: 'updateArticleFragment',
        module: 'updateArticleFragment',
        info: '更新 articleFragment',
    },
    {
        name: 'updateDcard',
        module: 'updateDcard',
        info: '更新 Dcard',
    },
    {
        name: 'updateRSSBot',
        module: 'updateRSSBot',
        info: '更新 updateRSSBot',
    },
    {
        name: 'updateLyca',
        module: 'updateLyca',
        info: '更新 updateLyca',
    },
    {
        name: 'updateAlipayScheme',
        module: 'updateAlipayScheme',
        info: '更新 updateAlipayScheme',
    },
    {
        name: 'updateInitium',
        module: 'updateInitium',
        info: '更新 updateInitium',
    },
    {
        name: 'updateNHKEasyNews',
        module: 'updateNHKEasyNews',
        info: '更新 updateNHKEasyNews',
    },
    {
        name: 'updateNHKWebNews',
        module: 'updateNHKWebNews',
        info: '更新 updateNHKWebNews',
    },
    {
        name: 'updateBetterDevVideo',
        module: 'updateBetterDevVideo',
        info: '更新 updateBetterDevVideo',
    },
    {
        name: 'wake',
        module: 'wake',
        info: '定时唤醒',
    },
    {
        name: 'wake2',
        module: 'wake2',
        info: '定时唤醒',
    },
    {
        name: 'rechargeHK',
        module: 'rechargeHK',
        info: '充值提醒',
    },
];

cloudFuncConfig.forEach((config) => {
    const { name, module, info } = config;

    AV.Cloud.define(name, () => {
        const modules = Array.isArray(module) ? module : [module];
        Promise.each(modules, (module) => {
            const func = require(`./app-modules/${module}`) || function() {};
            console.log(module);
            return func();
        })
            .then(() => {})
            .catch((err) => {
                console.error(err);
            });

        return info;
    });
});
