'use strict';

const _ = require('lodash');
const updateContainer = require('app-containers/update');
const getBroadviewData = require('./getBroadviewData');

module.exports = async () => {
    const times = 4;
    const offsets = _.times(times);

    try {
        return await updateContainer({
            dbName: 'Broadview',
            mail: {
                title: 'Broadview有新书啦~',
                template: ({ url = '', title = '', cover = '' }) => {
                    return `
                        <div style="margin-bottom: 30px">
                            <a href="${url}" target="_blank">
                                <h4>${title}</h4>
                            </a>
                            <div>
                                <img src="${cover}" alt="">
                            </div>
                        </div>
                    `;
                }
            },
            getTargetData: () => {
                return getBroadviewData({
                    offsets
                });
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