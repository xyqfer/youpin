'use strict';

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
            return targetData.filter((item) => {
                for (let i = 0; i < dbData.length; i++) {
                    if (item[this.filterKey] === dbData[i][this.filterKey]) {
                        return false;
                    }
                }

                return true;
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
        const targetData = await this.getTargetData();
        const newData = await this.filterData(dbData, targetData);

        const saveDataResult = this.saveData(newData);
        const notifyResult = this.notify(newData);

        await saveDataResult;
        await notifyResult;

        return newData;
    }.bind(mergeParams))();
};