const uniqBy = require('lodash/uniqBy');
const { db, mail: sendMail } = require('app-libs');
const { saveDbData, cache } = db;

module.exports = async (params = {}) => {
    const baseParams = {
        dbName: '',
        mail: {
            title: '',
            template: () => '',
        },
        getDbData: async function() {
            return await cache.init({
                dbName: this.dbName,
                query: {
                    select: [this.filterKey],
                },
                count: 2 * 1000,
            });
        },
        getTargetData: () => [],
        filterKey: '',
        alreadySaved: false,
        filterData: async function(dbData, targetData) {
            const newData = await cache.findAndSet({
                dbName: this.dbName,
                source: targetData,
                key: this.filterKey,
            });
            this.alreadySaved = true;

            return newData;
        },
        saveData: function(data = []) {
            if (!this.alreadySaved) {
                this.alreadySaved = true;

                return saveDbData({
                    dbName: this.dbName,
                    data,
                });
            }
        },
        notify: function(data = []) {
            return sendMail({ ...this.mail, data });
        },
    };

    const mergeParams = Object.assign({}, baseParams, params);
    return async function() {
        const dbData = await this.getDbData();
        let newData = [];

        if (this.getNewData) {
          newData = await this.getNewData(dbData);
        } else {
          const targetData = uniqBy(await this.getTargetData(), this.filterKey);
          newData = await this.filterData(dbData, targetData);
        }

        if (newData.length > 0) {
            const saveDataResult = this.saveData(newData);
            const notifyResult = this.notify(newData);

            await saveDataResult;
            await notifyResult;
        }

        return newData;
    }.bind(mergeParams)();
};
