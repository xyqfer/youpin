'use strict';

module.exports = async () => {
    const updateSpecialNews = require('./updateSpecialNews');
    const updateInvestage = require('./updateInvestage');

    try {
        // await updateSpecialNews();
        await updateInvestage();

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