'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getPtpressData = require('./getPtpressData');

    try {
        return await updateContainer({
            dbName: 'Epubit',
            mail: {
                title: '人邮有新书',
                template: ({ url = '', title = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                <img src="${cover}" alt="">
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getPtpressData();
            },
            filterKey: 'url'
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};