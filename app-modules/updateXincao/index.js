'use strict';
const moment = require('moment');
const { mail: sendMail } = require('app-libs');

module.exports = async () => {
    const since = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const historyLink = encodeURIComponent(`https://abriefhistoryofyesterday.com/fetch?date=${yesterday}`);

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
                title: 'A Brief History of Yesterday',
                url: `${process.env.IMAGE_PROXY}${historyLink}`,
            }
        ];
        const now = new Date();
        const date = now.getDate();
        if (date === 26) {
            data.push({
                title: '燃气费',
                url: 'alipays://platformapi/startapp?appId=20000193',
            });
        }

        if (date === 5 || date === 6 || date === 7) {
          data.push({
            title: '中行充话费优惠',
            url: 'bocmbciphone://',
          })
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
