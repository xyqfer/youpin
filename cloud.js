const AV = require('leanengine');

AV.Cloud.define('youpin_1', function(request) {
    const rp = require('request-promise');
    const basePath = process.env.LEANCLOUD_APP_ENV == 'production' ? process.env.hostName : 'http://localhost:3000';

    rp.get({
        uri: `${basePath}/api/v1/youpin/update`
    });

    return 'update_youpin 定时任务';
});

AV.Cloud.define('ele_restaurant', function (request) {
    const rp = require('request-promise');
    const basePath = process.env.LEANCLOUD_APP_ENV == 'production' ? process.env.hostName : 'http://localhost:3000';

    rp.get({
        uri: `${basePath}/api/v1/ele/update`
    });

    return 'update_ele 定时任务';
});

AV.Cloud.define('update_book', function(request) {
    const rp = require('request-promise');
    const basePath = process.env.LEANCLOUD_APP_ENV == 'production' ? process.env.hostName : 'http://localhost:3000';

    rp.get({
        uri: `${basePath}/api/v1/book/update`
    });

    return 'update_book 定时任务';
});

AV.Cloud.define('book_notify', (request) => {
    const rp = require('request-promise');
    const basePath = process.env.LEANCLOUD_APP_ENV == 'production' ? process.env.hostName : 'http://localhost:3000';

    rp.get({
        uri: `${basePath}/api/v1/book/notify`
    });

    return 'notify_book 定时任务';
});