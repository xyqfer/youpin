'use strict';

module.exports = (req, res, next) => {
    const loadData = require('./_loadData');

    const offset = parseInt(req.query.offset || 0);
    const page = parseInt(req.query.page || 1);
    const platform = req.query.platform || '';

    loadData({
        url: `https://www.uplabs.com/showcases/all/more.json?days_ago=${offset}&per_page=12&page=${page}`,
        platform: platform
    }).then((data) => {
         res.json(data);
    });
};