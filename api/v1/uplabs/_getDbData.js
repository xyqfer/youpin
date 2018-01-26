'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const dbName = 'Uplabs';

    let query = new AV.Query(dbName);
    query.ascending('updatedAt');
    query.limit(500);

    return query.find();
};