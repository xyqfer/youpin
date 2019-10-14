'use strict';

module.exports = {
    ua: {
        mobile: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60',
        pc: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        youpin:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MIOTStore/20170715 (YouPin;1.10.2;5AA7487BD51C5514;20170927100915;I;00000000-0000-0000-0000-000000000000;)',
    },
    env: {
        isProd: process.env.LEANCLOUD_APP_ENV === 'production',
        isStg: process.env.LEANCLOUD_APP_ENV === 'stage',
        isDev: process.env.LEANCLOUD_APP_ENV === 'development' || process.env.LEANCLOUD_APP_ENV == null || process.env.LEANCLOUD_APP_ENV === '',
    },
};
