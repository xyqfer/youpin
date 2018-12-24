'use strict';
const AV = require('leanengine');

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getWechatAnnounceData = require('./getWechatAnnounceData');

    try {
        // 晚上18点15分前发天气预报邮件
        const today = new Date();
        const needSendWeather = today.getHours() === 18 && today.getMinutes() <= 15;

        if (needSendWeather) {
            await AV.Cloud.run('updateGZWeather', {});
        }

        await AV.Cloud.run('updateLeetcode', {});
    } catch (err) {
        console.log(err);
    }

    try {
        const filterKey = 'url';
        const dbName = 'WechatAnnounce';

        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '有新的微信公众平台-系统公告',
                template: ({ title = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}" target="_blank">
                                ${title}
                              </a>
                            </h4>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getWechatAnnounceData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};