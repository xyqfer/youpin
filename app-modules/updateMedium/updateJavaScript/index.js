'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getJavaScriptData = require('./getJavaScriptData');

    try {
        return await updateContainer({
            dbName: 'Medium',
            mail: {
                title: 'Medium-JavaScript 有更新',
                template: ({ url = '', title = '' }) => `
                        <div style="margin-bottom: 50px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `,
            },
            getTargetData: () => getJavaScriptData(),
            filterKey: 'url',
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
