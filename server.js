'use strict';

const { initCloudEngine } = require('@xyqfer/init-leancloud-engine');
initCloudEngine();

const app = require('./app');

(async () => {
    const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

    app.listen(PORT, function() {
        console.log('Node app is running on port:', PORT);

        // 注册全局未捕获异常处理器
        process.on('uncaughtException', function(err) {
            console.error('Caught exception:', err.stack);
        });
        process.on('unhandledRejection', function(reason, p) {
            console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
        });
    });
})();
