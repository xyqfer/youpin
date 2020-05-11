'use strict';

module.exports = async () => {
    const compareVersions = require('compare-versions');
    const {
        params,
        http,
        db: { getDbData },
    } = require('app-libs');
    const dbName = 'ipa';
    const name = 'Alipay';

    const { Version: ver, path: downUrl } = await http.get({
        json: true,
        uri: 'https://app4.i4.cn/appinfo.xhtml?appid=150879&pkagetype=1&model=iPhone&from=1&ts=1',
        headers: {
            'User-Agent': params.ua.pc,
        },
    });
    const [dbData] = await getDbData({
        dbName,
        limit: 1,
        query: {
            equalTo: ['name', name],
        },
    });

    if (compareVersions(ver, dbData.ver) > 0) {
        http.get({
            uri: 'https://extract-ipa.herokuapp.com',
        });

        setTimeout(() => {
            http.get({
                uri: `https://extract-ipa.herokuapp.com/extract?url=${downUrl}&token=${process.env.ipaToken}&ver=${ver}`,
            });
        }, 10 * 1000);
    }

    return {
        success: true,
    };
};
