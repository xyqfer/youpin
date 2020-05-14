const https = require('https');

const ping = () => {
    https.get(`https://${process.env.LEANCLOUD_APP_DOMAIN}.avosapps.us/`, () => {}).on('error', () => {});
    https.get('https://xyx74gq3d1.run-us-west2.goorm.io/', () => {}).on('error', () => {});
    
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour <= 16) {
        setTimeout(ping, 5000);
    }
};
ping();