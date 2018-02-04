'use strict';

module.exports = (req, res, next) => {
    const rp = require('request-promise');
    const formatData = require('./_formatData');

    const name = req.params.name;
    const page = req.query.page || 1;
    const url = `https://www.uplabs.com/collections/${name}?page=${page}`;

    rp.get({
        json: true,
        uri: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
        }
    }).then((result) => {
        res.json(result.map((item) => {
            return formatData(item);
        }));
    }).catch(() => {
        res.json([]);
    });
};