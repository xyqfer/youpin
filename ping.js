const https = require('https');

const ping = () => {
    https.get(`https://${process.env.LEANCLOUD_APP_DOMAIN}.avosapps.us/`, () => {}).on('error', () => {});
    setTimeout(ping, 5000);
};
ping();