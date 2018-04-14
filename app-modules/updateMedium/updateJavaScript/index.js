'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getJavaScriptData = require('./getJavaScriptData');

    try {
        return await updateContainer({
            dbName: 'Medium',
            mail: {
                title: 'Medium-JavaScript更新了~',
                template: ({ url = '', title = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getJavaScriptData();
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