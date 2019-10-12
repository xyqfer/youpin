'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getFanfouData = require('./getFanfouData');
    const dbName = 'FanfouContent';
    const filterKey = 'postId';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '饭否有更新啦',
                template: ({ content = '', postId = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="http://fanfou.com/statuses/${postId}" target="_blank">
                                <h4>${postId}</h4>
                            </a>
                            <p>
                                ${content}
                            </p>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getFanfouData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};