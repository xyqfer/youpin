'use strict';

const updateContainer = require('app-containers/update');
const sendMail = require('app-libs/mail');
const getChinaPubData = require('./getChinaPubData');
const getNewData = require('./getNewData');

module.exports = async () => {
    const dbName = 'ChinaPubBooks';
    const filterKey = 'url';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            getTargetData: () => getChinaPubData(),
            notify: async function(data) {
                const newData = await getNewData(data);
                if (newData.length > 0) {
                    return sendMail({
                        title: 'ChinaPub 有新书啦',
                        data: newData,
                        template: ({ url = '', name = '', intro = '', cover = '' }) => {
                            const bookUrl = `${process.env.hostName}/api/v1/book/redirect?url=${encodeURIComponent(url)}`;
                            return `
                                <div style="margin-bottom: 30px">
                                    <a href="${bookUrl}" target="_blank">
                                        <h4>${name}</h4>
                                    </a>
                                    <p>
                                        ${intro}
                                    </p>
                                    <div>
                                        <img src="${cover}" alt="">
                                    </div>
                                </div>
                            `;
                        },
                    });
                }
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
