'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getZhihuHotData = require('./getZhihuHotData');

    const filterKey = 'url';
    const dbName = 'ZhihuHot';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '知乎热榜有更新',
                template: ({ url = '', title = '' }) => {
                    if (url.startsWith('https://zhuanlan.zhihu.com')) {
                        url = `https://oia.zhihu.com/articles/${url.replace('https://zhuanlan.zhihu.com/p/', '')}`;
                    } else {
                        url = url.replace('www.zhihu.com', 'oia.zhihu.com');
                    }

                    return `
                        <div style="margin-bottom: 50px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                        </div>
                    `;
                },
            },
            getTargetData: () => getZhihuHotData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
