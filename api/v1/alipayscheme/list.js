'use strict';

module.exports = async (req, res) => {
    const { getDbData } = require('app-libs/db');

    try {
        const [dbData] = await getDbData({
            dbName: 'ipa',
            limit: 1,
            query: {
                equalTo: ['name', 'Alipay'],
            },
        });
        const list = dbData.info.map((item) => ({
            name: item.name,
            desc: item.desc,
            appId: item.appId,
            schemaUri: item.schemaUri === '' ? `alipays://platformapi/startapp?appId=${item.appId}` : item.schemaUri,
        }));

        res.json({
            success: true,
            data: {
                ver: dbData.ver,
                list,
            },
        });
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            data: {},
        });
    }
};
