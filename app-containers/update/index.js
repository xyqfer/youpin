const differenceBy = require('lodash/differenceBy');
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
                count: 5 * 1000,
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
        const dbCount = dbData.length;
        const targetData = uniqBy(await this.getTargetData(), this.filterKey);
        const targetDataCount = targetData.length;

        // todo
        let a = differenceBy(targetData, dbData, this.filterKey);
        console.error(`${this.mail.title}: pre: ${a.length}`);
        if (this.dbName === 'DATA_TECH') {
          const fs = require('fs');
          fs.writeFileSync('/tmp/target1.json', JSON.stringify(targetData));
        }

        const newData = await this.filterData(dbData, targetData);

        console.error(`${this.mail.title}: key: ${this.filterKey}, db-count: ${dbCount} -> ${dbData.length}, target-count: ${targetDataCount}, new-count: ${newData.length}`);

        if (newData.length > 0) {
            const saveDataResult = this.saveData(newData);
            const notifyResult = this.notify(newData);

            await saveDataResult;
            await notifyResult;
        }

        return newData;
    }.bind(mergeParams)();
};
