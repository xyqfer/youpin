'use strict';
const { db, http } = require('app-libs');
const { cache } = db;

module.exports = async () => {
    const dbName = 'Wake';
    const dbData = await cache.init({
        dbName,
    });

    dbData.forEach(async (item) => {
        try {
            await http.get({
                uri: item.url,
            });
        } catch (e) {
            http.post({
                uri: `https://us-w1-console-api.leancloud.app/1.1/engine/groups/web/production/version?gitTag=${item.git_tag}&token=${item.deploy_token}`
            });
        }
    });

    return {
        success: true,
    };
};
