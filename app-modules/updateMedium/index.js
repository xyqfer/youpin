'use strict';

module.exports = async () => {
    const updateJavaScript = require('./updateJavaScript');

    try {
        await updateJavaScript();

        return {
            success: true,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
        };
    }
};
