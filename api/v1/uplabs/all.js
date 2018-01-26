'use strict';

module.exports = (req, res, next) => {
    const loadData = require('./_loadData');
    const getFormatTime = require('./_formatTime');
    const saveDbData = require('./_saveDbData');

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

    const url = page == 0 ?
        `https://www.uplabs.com/all.json?days_ago=${offset}&page=1` :
        `https://www.uplabs.com/showcases/all/more.json?days_ago=${offset}&per_page=12&page=${page}`;

    function redirectUplabs() {
        console.log('uplabs 异常');
        res.redirect(url);
    }

    loadData({
        url
    }).then((data) => {
        if (data && data.length > 0) {
            saveDbData(data);
            res.json(data);
        } else {
            redirectUplabs();
        }
    }).catch((err) => {
        console.log(err);
        redirectUplabs();
    });
};