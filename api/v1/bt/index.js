'use strict';

const utils = require('./data.js');
const createRangeObj = (range) => {
    let rangeObj = {};

    try {
        let [ unit, ranges ] = range.split('=');

        if (unit.toLowerCase() === 'bytes') {
            let [ start, end ] = ranges.split('-');
            start = parseInt(start);
            end = parseInt(end);

            if (!isNaN(start)) {
                rangeObj.start = start;
            }

            if (!isNaN(end)) {
                rangeObj.end = end;
            }
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
        if (rangeObj.start && rangeObj.end) {
            res.status(206);
            res.set('Content-Range', `bytes ${rangeObj.start}-${rangeObj.end}/${data.length}`);
        }
        
        console.log(rangeObj);
        data.file.createReadStream(rangeObj).pipe(res);
    });
};