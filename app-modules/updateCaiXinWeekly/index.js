'use strict';

module.exports = async () => {
    const updateContainer = require('app-containers/update');
    const getData = require('./getData');

    const filterKey = 'no';
    const dbName = 'CBNweekly';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: '财新周刊有更新',
                template: ({ time = '', title = '', img = '', url = '' }) => {
                    return `
                        <div style="margin-bottom: 50px">
                            <h4>
                              <a href="${url}" target="_blank">
                                ${title}
                              </a>
                            </h4>
                            <div>${time}</div>
                            <div>
                                <img src="${img}" 
                                    alt="">
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getData();
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};