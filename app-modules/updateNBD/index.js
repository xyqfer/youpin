'use strict';

module.exports = async () => {
    const updateSpecialNews = require('./updateSpecialNews');
    const updateInvestigate = require('./updateInvestigate');

    try {
        await updateSpecialNews();
        await updateInvestigate();

        return {
            success: true
        };
    } catch (err) {
        console.error(err);
        return {
            success: false
        };
    }
};