const axios = require('axios');
const update = require('./update');

module.exports = async (user = '') => {
    try {
        const result = await axios({
            method: 'get',
            url: `https://api.twitter.com/1.1/friends/list.json?screen_name=${user}&count=200`,
            headers: {
                'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
        });
        const userList = result.data.users.map((item) => item.screen_name);

        return await update(userList, true);
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
