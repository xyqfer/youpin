'use strict';

module.exports = (req, res, next) => {
    const loadData = require('./_loadData');

    const offset = parseInt(req.query.offset || 0);
    const platform = req.query.platform || '';

    loadData({
        url: `https://www.uplabs.com/all.json?days_ago=${offset}&page=1`,
        platform: platform
    }).then((data) => {
        res.json(data);
    });
};