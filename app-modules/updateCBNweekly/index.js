'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getCBNweeklyData = require('./getCBNweeklyData');

    const filterKey = 'no';
    const dbName = 'CBNweekly';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'CBNweekly 更新',
                template: ({ no = '', time = '', title = '', img = '', url = '' }) => `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}" target="_blank">
                                ${title}
                              </a>
                            </h4>
                            <div>${no} - ${time}</div>
                            <div>
                                <img src="${img}" 
                                    alt="">
                            </div>
                        </div>
                    `,
            },
            getTargetData: () => getCBNweeklyData(),
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
