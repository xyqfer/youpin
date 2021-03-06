'use strict';

module.exports = async () => {
    const updateInvestage = require('./updateInvestage');

    try {
        await updateInvestage();

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
