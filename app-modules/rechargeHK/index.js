'use strict';

const { mail: sendMail } = require('app-libs');

module.exports = () => {
    sendMail({
        title: 'HK 手机卡充值提醒',
        data: [{
            url: 'https://coderschool.cn/3331.html',
            title: '教程',
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
