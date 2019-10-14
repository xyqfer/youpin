'use strict';

module.exports = (data) => {
    const AV = require('leanengine');
    const getDbData = require('./_getDbData');
    const updateOSS = require('./_updateOSS');

    const dbName = 'Uplabs';

    if (!Array.isArray(data)) {
        data = [data];
    }

    getDbData().then((dbData) => {
        const newData = [];

        data.forEach((item) => {
            const index = dbData.findIndex((dbItem) => item.id === dbItem.get('postId'));

            if (index === -1) {
                const UplabsPost = AV.Object.extend(dbName);
                const post = new UplabsPost();

                post.set('postId', item.id);
                post.save(null, {
                    useMasterKey: false,
                });

                newData.push(item);
            }
        });

        if (newData.length > 0) {
            updateOSS(newData);
        }
    });
};
