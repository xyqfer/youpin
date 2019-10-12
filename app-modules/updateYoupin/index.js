'use strict';
const updateContainer = require('app-containers/update');
const getYoupinData = require('./getYoupinData');

module.exports = async () => {
    const dbName = 'Mi_store';
    const filterKey = 'gid';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            getTargetData: () => {
                return getYoupinData();
            },
            mail: {
                title: '米家上新品啦',
                template: ({ url = '', name = '', summary = '', }) => {
                    return `<div><a href='${url}' target='_blank'><h4>${name}</h4></a><br><div>${summary}</div></div>`;
                }
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};
