'use strict';

module.exports = async () => {
    const AV = require('leanengine');

    try {
        const dbName = 'Codrop';
        const query = new AV.Query(dbName);

        query.descending('updatedAt');
        query.limit(1000);

        const data = await query.find();
        return data.map((item) => {
            return item.toJSON();
        });
    } catch (err) {
        console.log(err);
        return [];
    }
};