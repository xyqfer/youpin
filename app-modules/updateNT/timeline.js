const axios = require('axios');
const update = require('./update');
const { getFriends } = require('./utils');

module.exports = async (user = '') => {
    try {
        const userList = await getFriends(user)

        return await update(userList, true);
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
