'use strict';

module.exports = async () => {
    const unescape = require('unescape');
    const updateContainer = require('app-containers/update');
    const getDribbbleData = require('./getDribbbleData');

    const filterKey = 'url';
    const dbName = 'Dribbble';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Dribbble 有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${unescape(summary)}
                            </div>
                        </div>
                        <br><br>
                    `;
                }
            },
            getTargetData: () => {
                return getDribbbleData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};