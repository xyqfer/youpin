'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const get200WADData = require('./get200WADData');

    const filterKey = 'url';
    const dbName = 'Konachan';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '刷200wordsaday啦~',
                template: ({ title = '',  url = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `;
                },
                device: 'device2',
            },
            getTargetData: () => {
                return get200WADData();
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};