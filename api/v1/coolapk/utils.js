const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const getMD5 = (s) => {
    const md5 = crypto.createHash('md5');
    return md5.update(s + '').digest('hex');
};

const getCoolapkAppToken = () => {
    const DEVICE_ID = uuidv4();
    const UnixDate = Math.floor(Date.now() / 1000);
    const t = UnixDate;
    const hex_t = "0x" + UnixDate.toString(16).toUpperCase();
    
    const md5_t = getMD5(t);
    const a = "token://com.coolapk.market/c67ef5943784d09750dcfbb31020f0ab?" + md5_t + "$" + DEVICE_ID + "&com.coolapk.market";
    const md5_a = getMD5(Buffer.from(a, 'utf-8').toString('base64'));
    const token = md5_a + DEVICE_ID + hex_t;
    return token;
};

const getCoolapkDeviceToken = () => {
    const u = uuidv4();
    return getMD5(u + u + u) + 'ady6r8';
};

module.exports = {
    getCoolapkAppToken,
    getCoolapkDeviceToken,
};