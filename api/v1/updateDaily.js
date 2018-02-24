'use strict';

// 每日更新一次
module.exports = (req, res) => {
    const updateGitHubTrending = require('./updateGitHubTrending');
    const updateCodrop = require('./updateCodrop');
    const updateBook = require('./book/update');

    updateBook().then(() => {
        return updateGitHubTrending();
    }).then(() => {
        return updateCodrop();
    }).catch((err) => {
        console.log(err);
    });

    res.end();
};