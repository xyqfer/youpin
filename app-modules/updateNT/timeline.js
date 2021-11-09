const update = require('./update');
const { getFriends } = require('./utils');

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1000)
    })
}

module.exports = async (user = '') => {
    try {
        const userList = await getFriends(user)

        for (let i = 0; i < userList.length; i += 100) {
            await update(userList.slice(i, i + 100), true);
            await sleep(10);
        }

        return {
            success: true
        }
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
