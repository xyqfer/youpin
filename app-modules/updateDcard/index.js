'use strict';

module.exports = async () => {
    const getData = require('./getData');
    const { mail: sendMail } = require('app-libs');

    try {
        const html = await getData();
        if (html) {
            sendMail({
                title: 'Dcard 更新',
                data: [{}],
                template: () => `
                        <div style="margin-bottom: 50px">
                            ${html}
                        </div>
                    `,
                device: 'device2',
            });
        }
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
