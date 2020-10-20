'use strict';

const { mail: sendMail } = require('app-libs');

module.exports = () => {
    sendMail({
        title: 'HK 手机卡充值提醒 & 八达通使用提醒',
        data: [{
            url: 'https://coderschool.cn/3331.html',
            title: '手机卡',
        }, {
            url: 'https://51.ruyo.net/16422.html',
            title: '八达通',
        }],
        template: ({ url = '', title = '' }) => `
            <div style="margin-bottom: 50px">
                <a href="${url}" target="_blank">
                    <h4>${title}</h4>
                </a>
            </div>
        `,
    });

    return {
        success: true,
    };
};
