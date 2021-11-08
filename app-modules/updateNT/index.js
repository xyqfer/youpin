const update = require('./update');
const { db } = require('app-libs');

module.exports = async () => {
    try {
        const username = await db.getDbData({
            dbName: 'NT_USER',
            limit: 1000,
        });
        const userList = username.map(({ name }) => name)

        return await update(userList)
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
