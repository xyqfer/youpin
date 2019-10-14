'use strict';

module.exports = async () => {
    const { mail: sendMail } = require('app-libs');

    try {
        const title = '刷新 Lyca';

        sendMail({
            title,
            data: [{}],
            template: () => title,
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
