const AV = require('leanengine');
const shell = require('shelljs');

const testModule = require('./app-modules/updateLagouComment');

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

initEnv();
// setProd();

// class JuejinContainer extends UpdateContainer {
//     getTargetData() {
//         return getJuejinData({});
//     }
// }

// shell.exec('node server', {
//     silent: false
// });

(async () => {
    try {
        const result = await testModule({});
        console.log(result);
    } catch (err) {
        console.error(err);
    }
})();




