'use strict';

module.exports = async () => {
  const redirectHttp = require('follow-redirects').http;
  const fs = require('fs');
  const compareVersions = require('compare-versions');
  const {
    params,
    http,
    db: {
      getDbData,
      updateDbData,
    }
  } = require('app-libs');
  const ipaExtract = require('./ipaExtract');
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
  console.log(ver, downUrl);
  const [dbData] = await getDbData({
    dbName,
    limit: 1,
    query: {
      equalTo: ['name', name]
    }
  });
  console.log(dbData);

  if (compareVersions(ver, dbData.ver) > 0) {
    console.log(downUrl);
    downUrl = Buffer.from(downUrl, 'base64').toString('ascii');

    const downloadPath = '/tmp/a.ipa';
    const ipaFile = fs.createWriteStream(downloadPath);
    redirectHttp.get(downUrl, function (response) {
      const stream = response.pipe(ipaFile);
      stream.on('finish', function () {
        console.log('finish');
        ipaExtract(downloadPath, function (error, { metadata }) {
          console.log(err);
          console.log(metadata);
          if (metadata && metadata.AppBaseInfos) {
            updateDbData({
              dbName,
              data: {
                info: Object.values(metadata.AppBaseInfos),
                ver,
              },
              id: dbData.objectId
            })
          }
        });
      });
    });
  }

  return {
    success: true
  };
};