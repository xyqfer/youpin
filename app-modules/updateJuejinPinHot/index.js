'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getPinData = require('./getPinData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '掘金 pin 有更新',
                template: ({ summary = '', url = '' }) => `
                        <div style="margin-bottom: 30px">
                            <div>
                                ${summary}
                            </div>
                            <hr>
                            <a href="${url}" target="_blank">[查看原文]</a>
                        </div>
                    `,
            },
            getTargetData: () => getPinData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
