'use strict';

module.exports = async () => {
    const unescape = require('unescape');
    const updateContainer = require('app-containers/update');
    const getKonachanData = require('./getKonachanData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'Konachan 有更新~',
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
                return getKonachanData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};