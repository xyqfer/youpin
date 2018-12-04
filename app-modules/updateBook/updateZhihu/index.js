'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getZhihuData = require('./getZhihuData');

    try {
        return await updateContainer({
            dbName: 'DoubanBook',
            mail: {
                title: '知乎有新书啦~',
                template: ({ name = '', url = '', pubInfo = '', desc = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 60px">
                            <a href="${url}" target="_blank">
                                <h4>${name}</h4>
                            </a>
                            <p>
                                ${pubInfo}
                            </p>
                            <div>
                                ${desc}
                            </div>
                            <div>
                                <img src="${cover}" 
                                    alt="">
                            </div>
                        </div>
                        <br><br>
                    `;
                }
            },
            getTargetData: () => {
                return getZhihuData();
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