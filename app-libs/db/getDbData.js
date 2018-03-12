'use strict';

module.exports = ({ dbName = 'Test', limit = 1000, query = {} }) => {
    const AV = require('leanengine');
    const isString = require('lodash/isString');

    const q = new AV.Query(dbName);

    Object.entries(query).forEach(([ key, params ]) => {
        if (isString(params)) {
            params = [params];
        }

        q[key].apply(q, params);
    });

    q.limit(limit);

    return q.find().then((data) => {
        return data.map((item) => {
            return item.toJSON();
        });
    }).catch((err) => {
        console.error(err);
        return [];
    });
};