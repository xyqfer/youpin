'use strict';

module.exports = ({ dbName = 'Text', data = {}, id = '' }) => {
    const dbObject = AV.Object.createWithoutData(dbName, id);

    Object.entries(data).forEach(([ key, value]) => {
        dbObject.set(key, value);
    });

    return dbObject.save();
};