'use strict';

module.exports = async ({ dbName = 'Test', limit = 1000, query = {} }) => {
    const AV = require('leanengine');
    const isString = require('lodash/isString');

    try {
        const q = new AV.Query(dbName);

        Object.keys(query).forEach((key) => {
            let params = query[key];

            if (isString(params)) {
                params = [params];
            }

            q[key].apply(q, params);
        });
        q.limit(limit);

        const data = await q.find();
        return data.map((item) => {
            return item.toJSON();
        });
    } catch (err) {
        console.log(err);
        return [];
    }
};