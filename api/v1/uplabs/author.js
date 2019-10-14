'use strict';

module.exports = (req, res) => {
    const loadData = require('./_loadData');

    const params = req.params;
    const author = params[0];
    const page = req.query.page || 1;
    const url = `https://www.uplabs.com/${author}.json?page=${page}`;

    loadData({
        url,
    })
        .then((data) => {
            res.json(data);
        })
        .catch(() => {
            res.json([]);
        });
};
