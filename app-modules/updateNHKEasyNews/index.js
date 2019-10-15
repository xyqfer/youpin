'use strict';

const _ = require('lodash');
const getData = require('./getData');
const { db, crawler } = require('app-libs');

module.exports = async () => {
    const dbName = 'NHKEasyNews';
    const filterKey = 'easyUrl';

    try {
        const nhkData = await getData();
        const containedInKeys = nhkData.map((item) => item[filterKey]);
        const containedData = await db.getData({
            dbName,
            query: {
                containedIn: [filterKey, containedInKeys],
            },
        });
        let newData = _.differenceBy(nhkData, containedData, filterKey);

        if (newData.length > 0) {
            newData = await Promise.mapSeries(newData, async (item) => {
                try {
                    const $ = await crawler(item.easyUrl);
                    item.content = $('#js-article-body').html();
                    return item;
                } catch (err) {
                    console.log(err);
                    return null;
                }
            });

            newData = newData.filter((item) => !!item);

            if (newData.length > 0) {
                db.saveDbData({
                    dbName,
                    data: newData,
                });
            }
        }

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
