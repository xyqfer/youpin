'use strict';

const uniqBy = require('lodash/uniqBy');
const flattenDeep = require('lodash/flattenDeep');
const {
    db: {
        getDbData,
        getDbCount,
        saveDbData,
    },
    mail: sendMail
} = require('app-libs');

module.exports = (params = {}) => {
    const baseParams = {
        dbName: '',
        maxDbFetchTimes: 10,
        mail: {
            title: '',
            template: () => ''
        },
        getDbData: async function () {
            const offsets = [];
            const per = 1000;

            const dbCount = await getDbCount({
                dbName: this.dbName,
            });
            const limit = Math.min(Math.ceil(dbCount / per), this.maxDbFetchTimes);

            for (let offset = 0; offset < limit; offset += 1) {
                offsets.push(offset * per);
            }

            let dbData = await Promise.mapSeries(offsets, async (offset) => {
                const dbData = await getDbData({
                    dbName: this.dbName,
                    query: {
                        descending: ['createdAt'],
                        skip: [offset],
                    },
                });
    
                return dbData;
            });
            return flattenDeep(dbData);
        },
        getTargetData: () => [],
        filterKey: '',
        filterData: function (dbData, targetData) {
            return Promise.filter(targetData, async (item) => {
                for (let i = 0; i < dbData.length; i++) {
                    if (item[this.filterKey] === dbData[i][this.filterKey]) {
                        return false;
                    }
                }

                const dbItem = await getDbData({
                    dbName: this.dbName,
                    limit: 1,
                    query: {
                        equalTo: [this.filterKey, item[this.filterKey]]
                    }
                });

                return dbItem.length === 0;
            }, {
                    concurrency: 1
                });
        },
        saveData: function (data = []) {
            return saveDbData({
                dbName: this.dbName,
                data
            });
        },
        notify: function (data = []) {
            return sendMail({ ...this.mail, data });
        }
    };

    const mergeParams = Object.assign(baseParams, params);
    return (async function () {
        const dbData = await this.getDbData();
        const targetData = uniqBy(await this.getTargetData(), this.filterKey);
        const newData = await this.filterData(dbData, targetData);

        if (newData.length > 0) {
            const saveDataResult = this.saveData(newData);
            const notifyResult = this.notify(newData);

            await saveDataResult;
            await notifyResult;
        }

        return newData;
    }.bind(mergeParams))();
};