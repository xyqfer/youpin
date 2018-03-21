'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const get36KrNextData = require('./get36KrNextData');

    try {
        return await updateContainer({
            dbName: 'Next36Kr',
            mail: {
                title: '36Kr Next有更新了~',
                template: ({ url = '', title = '', desc = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${desc}
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return get36KrNextData();
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