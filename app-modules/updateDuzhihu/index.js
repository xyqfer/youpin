'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getData = require('./getData');

    const filterKey = 'url';
    const dbName = 'Dribbble';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '昨日知乎有更新~',
                template: ({ url = '', title = '', summary = '', }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};