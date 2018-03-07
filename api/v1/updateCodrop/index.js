'use strict';

module.exports = () => {
    const path = require('path');
    const sendMail = require(path.resolve(process.cwd(), 'api/lib/mail'));
    const getCodropData = require('./getCodropData');
    const getDbData = require('./getDbData');
    const saveDbData = require('./saveDbData');

    return (async () => {
        const dbData = await getDbData();
        const codropData = await getCodropData();

        const newData = codropData.filter((codropItem) => {
            for (let i = 0; i < dbData.length; i++) {
                if (dbData[i].postId === codropItem.postId) {
                    return false;
                }
            }

            return true;
        });

        if (newData.length > 0 && process.env.LEANCLOUD_APP_ENV !== 'development') {
            const mailContent = newData.map((item) => {
                return `<a href='${item.url}'>${item.name}</a><br><br>`;
            }).join('');

            saveDbData(newData);
            sendMail({
                title: 'Codrop 更新啦',
                mailContent: mailContent
            });
        }

        return {
            finish: true
        };
    })();
};