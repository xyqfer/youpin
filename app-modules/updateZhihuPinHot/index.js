'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getZhihuPinHotData = require('./getZhihuPinHotData');

    const filterKey = 'url';
    const dbName = 'Dribbble';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '知乎想法热榜有更新~',
                template: ({ title = '', summary = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                ${summary}
                            </div>
                        </div>
                        <br><br>
                    `;
                }
            },
            getTargetData: () => {
                return getZhihuPinHotData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};