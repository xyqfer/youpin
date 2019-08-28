'use strict';

module.exports = async () => {
    const rp = require('request-promise');
    const { getDbData } = require('app-libs/db');

    const dbData = await getDbData({
        dbName: 'Wake',
      });
    const urls = dbData.map(({ url, }) => {
        return url;
    });

    Promise.all(
        urls.map((uri) => {
            return rp.get({
                uri
            });
        })
    ).catch(() => {});

    return {
        success: true
    };
};