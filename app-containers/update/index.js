'use strict';

const Promise = require('bluebird');
const uniqBy = require('lodash/uniqBy');
const {
    db: {
        getDbData,
        saveDbData
    },
    mail: sendMail
} = require('app-libs');

module.exports = (params = {}) => {
    const baseParams = {
        dbName: '',
        mail: {
            title: '',
            template: () => ''
        },
        getDbData: function () {
            return getDbData({
                dbName: this.dbName,
                query: {
                    descending: ['updatedAt']
                }
            });
        },
        getTargetData: () => [],
        filterKey: '',
        filterData: function (dbData, targetData) {
            return Promise.filter(targetData, async (item) => {
                console.log(this.filterKey, item, this.dbName)
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