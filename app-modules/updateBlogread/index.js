'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getBlogreadData = require('./getBlogreadData');

    const filterKey = 'url';
    const dbName = 'Blogread';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '技术头条有更新',
                template: ({ title = '', url = '', summary = '' }) => `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}" target="_blank">
                                ${title}
                              </a>
                            </h4>
                            <div>
                                ${summary}
                            </div>
                        </div>
                    `,
            },
            getTargetData: () => getBlogreadData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
