'use strict';

// 每日更新一次
module.exports = (req, res) => {
    const updateGitHubTrending = require('./updateGitHubTrending');
    const updateCodepen = require('./updateCodepen');
    const updateCodrop = require('./updateCodrop');
    const updateBook = require('./book/update');

    updateBook().then(() => {
        return updateGitHubTrending();
    }).then(() => {
        return updateCodrop();
    }).then(() => {
        return updateCodepen();
    }).catch((err) => {
        console.log(err);
    });

    res.end();
};