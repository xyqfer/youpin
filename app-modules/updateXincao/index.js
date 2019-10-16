'use strict';
const moment = require('moment');
const { mail: sendMail } = require('app-libs');

module.exports = async () => {
    const since = moment().format('YYYY-MM-DD');

    try {
        const title = '刷书啦';
        const data = [
            {
                title: 'Server Storage Status',
                url: `${process.env.NUXT_URL}/server-status/storage`,
            },
            {
                title: 'Server Error Status',
                url: `${process.env.NUXT_URL}/server-status/error?since=${since}`,
            },
            {
                title: '领蚂蚁积分',
                url: 'alipays://platformapi/startapp?appId=20000160',
            },
            {
                title: '签到',
                url: 'mnw://',
            },
        ];
        const now = new Date();
        if (now.getDate() === 26) {
            data.push({
                title: '燃气费',
                url: 'alipays://platformapi/startapp?appId=20000193',
            });
        }

        sendMail({
            title,
            data,
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
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
