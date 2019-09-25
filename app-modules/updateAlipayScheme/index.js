'use strict';

module.exports = async () => {
  const compareVersions = require('compare-versions');
  const {
    params,
    http,
    db: {
      getDbData,
    },
  } = require('app-libs');
  const dbName = 'ipa';
  const name = 'Alipay';

  let { ver, downUrl } = await http.post({
    json: true,
    uri: 'http://ppmac2.25pp.com/pp_api/proxy.php?name=pptool_local_appdetail',
    headers: {
      'User-Agent': params.ua.pc,
    },
    form: {
      site: 3,
      clFlag: 0,
      id: 333206289
    }
  });
  const [dbData] = await getDbData({
    dbName,
    limit: 1,
    query: {
      equalTo: ['name', name]
    }
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
    success: true
  };
};