'use strict';
const { db, http } = require('app-libs');
const { cache } = db;

module.exports = async () => {
    const dbName = 'Wake';
    const dbData = await cache.init({
        dbName,
        query: {
            select: ['url'],
        },
    });

    Promise.all(
        dbData.map(({ url }) =>
            http.get({
                uri: url,
            })
        )
    ).catch(() => {});

    return {
        success: true,
    };
};
