'use strict';

module.exports = async () => {
    const { mail: sendMail, http, params } = require('app-libs');

    try {
        const result = await http.post({
            uri: 'https://app.gdyueyun.com/service/busstation/getTickets',
            headers: {
                'User-Agent': params.ua.pc,
            },
            json: true,
            form: {
                stationId: 268,
                thirdCode: null,
                endStationName: '天河',
                date: '2019-02-10',
                flag: 1,
                versionCode: '20190102',
                versionName: '1.4.2',
                type: 0,
                deviceCode: 'ffffffff-ffff-ffff-ffff-ffffffffff',
                isUpload: false,
                needCache: false,
                url: 'https://app.gdyueyun.com/service/busstation/getTickets',
                values: '{versionName=1.4.2, endStationName=天河, stationId=268, versionCode=20190102, date=2019-02-10, thirdCode=null, deviceCode=ffffffff-ffff-ffff-ffff-ffffffffff, type=0, flag=1}',
            },
        });

        if (result.result.tickets > 0) {
            const title = '有返程车票啦';
            sendMail({
                title,
                data: [
                    {
                        url: 'weixin://',
                        title,
                    },
                ],
                template: ({ url = '', title = '' }) => `
                    <div style="margin-bottom: 50px">
                        <a href="${url}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                    </div>
                `,
            });
        }

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
