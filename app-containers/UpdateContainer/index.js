'use strict';

const {
    db: {
        getDbData,
        saveDbData
    },
    mail: sendMail
} = require('app-libs');

class UpdateContainer {
    constructor({
        mail = {
            title: '',
            template: () => ''
        }
    }) {
        this.dbName = dbName;
        this.mail = mail;

        return (async () => {
            const dbData = await this.getDbData();
            const targetData = await this.getTargetData();
            const newData = await this.filterData(dbData, targetData);

            // const saveDataResult = this.saveData(newData);
            // const sendMailResult = this.sendMail(newData);
            //
            // await saveDataResult;
            // await sendMailResult;

            return newData;
        })();
    }

    getDbData() {
        return getDbData({
            dbName: this.dbName,
            query: {
                descending: ['updatedAt']
            }
        });
    }

    getTargetData() {
        return [];
    }

    filterData(dbData, targetData) {
        return targetData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.postId === dbData[i].postId) {
                    return false;
                }
            }

            return true;
        });
    }

    saveData(data = []) {
        return saveDbData({
            dbName: this.dbName,
            data
        });
    }

    sendMail(data = []) {
        return sendMail({ ...this.mail, data });
    }
}

const params = {
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
    filterData: function (dbData, targetData) {
        return targetData.filter((item) => {
            for (let i = 0; i < dbData.length; i++) {
                if (item.postId === dbData[i].postId) {
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
    },
};

module.exports = UpdateContainer;