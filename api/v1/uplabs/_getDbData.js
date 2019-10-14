'use strict';

module.exports = () => {
    const AV = require('leanengine');
    const dbName = 'Uplabs';

    const query = new AV.Query(dbName);
    query.descending('updatedAt');
    query.limit(500);

    return query.find();
};
