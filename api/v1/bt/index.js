'use strict';

const utils = require('./data.js');

module.exports = async (req, res) => {
    console.log(req.headers);

    const { torrentId } = process.env;
    utils.getBt(torrentId, (file) => {
        file.createReadStream().pipe(res);
    });
};