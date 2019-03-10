'use strict';

module.exports = async () => {
    const Promise = require('bluebird');
    const {
        params,
        http,
    } = require('app-libs');
    const getMenuContent = async () => {
        const result = await http.post({
            json: true,
            uri: 'https://tv.daydaycook.com.cn/top-content/content-index',
            headers: {
                'User-Agent': params.ua.pc,
            },
            body: { "deviceId": "00000000-0000-0000-0000-000000000000", "uid": "", "deviceType": "1", "sessionId": "", "userUniqueId": "", "version": "6.2.0", "mainland": "1", "languageId": "3", "ip": "192.168.31.105", "regionCode": "156" },
        });
        const urls = result.data.foodContentList.map((item) => {
            return {
                id: item.id,
                title: item.title,
                summary: item.summary,
            };
        });

        const data = await Promise.mapSeries(urls, async ({ id, title, summary }) => {
            try {
                const result = await http.post({
                    json: true,
                    uri: 'https://tv.daydaycook.com.cn/top-content/view',
                    headers: {
                        'User-Agent': params.ua.pc,
                    },
                    body: { "uid": "", "version": "6.2.0", "regionCode": "156", "userUniqueId": "", "deviceId": "00000000-0000-0000-0000-000000000000", "deviceType": "1", "businessCategoryId": "2", "mainland": "1", "contentId": id, "ip": "192.168.31.105", "languageId": "3", "sessionId": "", "showTag": "1" }
                });
                let data = {
                    url: id + 'DDK',
                    title: title,
                    summary: summary + '<br>',
                };

                data.summary += result.data.contentDetailList.reduce((acc, item) => {
                    acc += `
                        <strong>${item.groupTitle} - ${item.detail}</strong>
                        <img src="${item.image}" referrerpolicy="no-referrer">
                        <br>
                    `;
                    return acc;
                }, '');

                data.summary += result.data.contentFoodList.reduce((acc, item) => {
                    acc += `
                        <div>${item.name}${item.count || ''}</div>
                    `;
                    return acc;
                }, '');

                return data;
            } catch (err) {
                console.error(err);
                return [];
            }
        });

        return data;
    };
    const getTVContent = async () => {
        const result = await http.post({
            json: true,
            uri: 'https://mcn-app.daydaycook.com.cn/mcn/ios/1.0.1/ddctvList',
            headers: {
                'User-Agent': params.ua.pc,
            },
            body: { "deviceId": "00000000-0000-0000-0000-000000000000", "uid": "", "ip": "192.168.31.105", "regionCode": "156", "deviceType": "1", "userUniqueId": "", "session": "", "sysVersion": 12, "version": "6.2.0", "mainland": "1", "languageId": "3" },
        });
        
        return result.data.map((item) => {
            return {
                url: item.tvTypeId + item.bizId + item.tvTypeName,
                title: item.title,
                summary: `
                    ${item.vedioDescribe}<br>
                    <video src="${item.videoUrl}" controls="controls" poster="${item.coverUrl}" style="width: 100%"></video>
                `,
            };
        });
    };
    const getKSContent = async () => {
        const result = await http.get({
            json: true,
            uri: 'https://www.chufanggushi.com/api/recipes/?page_size=1&page=1&type=recipe',
            headers: {
                'User-Agent': params.ua.pc,
                'Accept-Language': 'zh',
            },
        });

        return result.data.map((item) => {
            let summary = '';

            if (item.video) {
                const video = item.video;
                summary = `
                    <video src="${video.video_url}" controls="controls" poster="${video.preview_image.url}" style="width: 100%"></video>
                `;
            } else {
                summary = `
                    <img src="${item.detail_image.url}" referrerpolicy="no-referrer">
                `;
            }

            summary += '<br>';
            summary += '<div><strong>食材:</strong></div>';
            summary += item.ingredients.reduce((acc, item) => {
                acc += `
                    <div>${item.name}${item.amount || ''}${item.unit || ''}</div>
                `;
                return acc;
            }, '');

            summary += '<br>';
            summary += '<div><strong>餐具:</strong></div>';
            summary += item.utensils.reduce((acc, item) => {
                acc += `
                    <div>${item.name}</div>
                `;
                return acc;
            }, '');

            summary += '<br>';
            summary += item.steps.reduce((acc, item, index, steps) => {
                acc += `
                    <div><strong>步骤 ${index + 1}/${steps.length}</strong></div>
                    <div><img src="${item.image.url}" referrerpolicy="no-referrer"></div>
                    <div>${item.text}</div>
                `;
                return acc;
            }, '');

            return {
                url: item.url,
                title: item.title,
                summary: summary,
            };
        });
    };

    try {
        const menuContent = await getMenuContent();
        const tvContent = await getTVContent();
        const ksContent = await getKSContent();
        return [...menuContent, ...tvContent, ...ksContent];
    } catch (err) {
        console.error(err);
        return [];
    }
};