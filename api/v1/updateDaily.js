'use strict';

// 每日更新一次
module.exports = (req, res) => {
    const updateGitHubTrending = require('./updateGitHubTrending');
    const updateCodrop = require('./updateCodrop');
    const updateBook = require('./book/update');

    updateBook().then(() => {
        return updateCodrop();
    }).then(() => {
        return updateGitHubTrending();
    }).catch((err) => {
        console.log(err);
    });

    res.end();
};