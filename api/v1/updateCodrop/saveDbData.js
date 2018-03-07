'use strict';

module.exports = (data) => {
    const AV = require('leanengine');

    const dbName = 'Codrop';
    const Codrop = AV.Object.extend(dbName);
    const codropObject = data.map((item) => {
        const codrop = new Codrop();
        codrop.set('postId', item.postId);

        return codrop;
    });

    return AV.Object.saveAll(codropObject).then((results) => {

    }).catch((err) => {
        console.log(err);
    });
};