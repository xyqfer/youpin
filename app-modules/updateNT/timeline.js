const update = require('./update');

module.exports = async (userList = []) => {
    try {
        return await update(userList, true)
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
