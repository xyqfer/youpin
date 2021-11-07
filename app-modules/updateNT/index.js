const updateContainer = require('app-containers/update');
const { getTargetData } = require('./utils');

module.exports = async () => {
    const filterKey = 'link';
    const dbName = 'NT_DATA';

    try {
        return await updateContainer({
            dbName,
            filterKey,
            mail: {
                title: 'nt 有更新',
                render: 'nt',
                template: ({ content = '' }) => {
                  return content;
                },
                device: 'device1',
            },
            getTargetData,
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
