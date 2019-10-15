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
            filterKey: 'url',
            getTargetData: () =>
                getBroadviewData({
                    offsets,
                }),
            mail: {
                title: 'Broadview 有新书',
                template: ({ url = '', title = '', cover = '' }) => `
                    <div style="margin-bottom: 30px">
                        <a href="${url}" target="_blank">
                            <h4>${title}</h4>
                        </a>
                        <div>
                            <img src="${cover}" alt="">
                        </div>
                    </div>
                `,
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
