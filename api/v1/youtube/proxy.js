module.exports = async (req, res) => {
    const request = require('request');
    const utils = require('./utils');
    const { id } = req.params;
    const url = await utils.getUrl(id);
    const headers = {};

    if (req.headers.range) {
        headers.Range = req.headers.range;
        console.log(req.headers.range);
    }

    request
        .get({
            url,
            headers,
        })
        .pipe(res);
};
