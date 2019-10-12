'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getMebookData = require('./getMebookData');

    try {
        return await updateContainer({
            dbName: 'Blogread',
            mail: {
                title: 'Mebook 有新书',
                template: ({ url = '', title = '', summary = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
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
                return getMebookData();
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