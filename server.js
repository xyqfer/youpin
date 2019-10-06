'use strict';

const { initCloudEngine } = require('@xyqfer/init-leancloud-engine');
initCloudEngine();

function init() {
  const AV = require('leanengine');

  console.log(process.env.LEANCLOUD_APP_ID, process.env.LEANCLOUD_APP_KEY, process.env.LEANCLOUD_APP_MASTER_KEY)
  
  AV.init({
    appId: process.env.LEANCLOUD_APP_ID,
    appKey: process.env.LEANCLOUD_APP_KEY,
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
  });
  
  AV.Cloud.useMasterKey();
}
// init();

const app = require('./app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error('Caught exception:', err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
  });
});
