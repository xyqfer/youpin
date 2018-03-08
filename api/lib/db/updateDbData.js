'use strict';

module.exports = ({ dbName = 'Text', data = {}, id = '' }) => {
    const dbObject = AV.Object.createWithoutData(dbName, id);

    Object.keys(data).forEach((key) => {
        dbObject.set(key, data[key]);
    });

    return dbObject.save();
};