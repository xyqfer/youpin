'use strict';

const utils = require('./data.js');
const createRangeObj = (range) => {
    let rangeObj = {};

    try {
        let [ start, end ] = range.split('-');
        start = parseInt(start);
        end = parseInt(end);

        if (!isNaN(start)) {
            rangeObj.start = start;
        }

        if (!isNaN(end)) {
            rangeObj.end = end;
        }
    } catch(err) {
        console.error(err);
        console.log(range);
    }

    return rangeObj;
};

module.exports = async (req, res) => {
    const { torrentId } = process.env;
    let rangeObj = {};

    if (req.headers.range) {
        console.log(req.headers.range);
        rangeObj = createRangeObj(req.headers.range);
    }

    utils.getBt(torrentId, (data) => {
        data.file.createReadStream(rangeObj).pipe(res);
    });
};