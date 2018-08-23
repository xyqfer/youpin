const AV = require('leanengine');
const shell = require('shelljs');

const testModule = require('./app-modules/updateCBNweekly');

const initEnv = () => {
    const envString = shell.exec('lean env', {
        silent: true
    }).stdout;

    envString.split('\n').filter((item) => {
        return item !== '';
    }).forEach((item) => {
        const [ key, value ] = item.split(' ')[1].split('=');
        process.env[key] = value;
    });

    AV.init({
        appId: process.env.LEANCLOUD_APP_ID,
        appKey: process.env.LEANCLOUD_APP_KEY,
        masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
    });
};

const setProd = () => {
    process.env.LEANCLOUD_APP_ENV = 'production';
};

// initEnv();
// setProd();

// class JuejinContainer extends UpdateContainer {
//     getTargetData() {
//         return getJuejinData({});
//     }
// }

// shell.exec('node server', {
//     silent: false
// });

// (async () => {
//     try {
//         const result = await testModule({});
//         console.log(result);
//     } catch (err) {
//         console.error(err);
//     }
// })();

require('isomorphic-fetch')
var Dropbox = require('dropbox').Dropbox;
new Dropbox({
  accessToken: ''
})
  .filesDownload({path: '/TE/2018-06/5af5461f73a9cf1a1d5677fd/article.xml'})
  .then((res) => {
    console.log(Buffer.from(res.fileBinary, 'binary').toString())
  }).catch(console.log);
