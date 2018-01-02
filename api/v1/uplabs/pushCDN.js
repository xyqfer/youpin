'use strict';

module.exports = (req, res, next) => {
    const loadData = require('./_loadData');
    const getFormatTime = require('./_formatTime');

    const params = req.params;
    const year = params[0];
    const month = params[1];
    const date = params[2];
    const page = params[3];

    const timeObj = getFormatTime();
    const currentYear = timeObj.year;
    const currentMonth = timeObj.month;
    const currentDate = timeObj.date;
    const offset = (((new Date(`${currentYear}-${currentMonth}-${currentDate}`)).getTime()) -
        ((new Date(`${year}-${month}-${date}`)).getTime())) / (24 * 60 * 60 * 1000);

    loadData({
        page: page,
        offset: offset
    }).then((data) => {
        res.json(data);
    });
};