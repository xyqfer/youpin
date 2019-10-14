'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getZhihuData = require('./getZhihuData');

    try {
        return await updateContainer({
            dbName: 'DoubanBook',
            mail: {
                title: '知乎有新书',
                template: ({ name = '', url = '', pubInfo = '', desc = '', cover = '' }) => `
                        <div style="margin-bottom: 30px">
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
                                <img src="${cover}" alt="">
                            </div>
                        </div>
                    `,
            },
            getTargetData: () => getZhihuData(),
            filterKey: 'url',
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
