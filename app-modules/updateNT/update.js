const updateContainer = require('app-containers/update');
const { getTargetData } = require('./utils');

module.exports = async (userList = [], sort = false) => {
    const filterKey = 'link';
    const dbName = 'NT_DATA';

    try {
        return await updateContainer({
            dbName: sort ? '' : dbName,
            filterKey,
            mail: {
                title: 'nt 有更新',
                render: 'nt',
                template: ({ content = '' }) => {
                  return content;
                },
                device: 'device1',
                open: 'safari',
            },
            getTargetData: () => {
                return getTargetData(userList, sort)
            },
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
