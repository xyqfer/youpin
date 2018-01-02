'use strict';

module.exports = () => {
    // GMT -8
    const zoneOffset = -8;
    const nowDate = new Date();
    const now = nowDate.getTime();
    const offsetMilliSecond = nowDate.getTimezoneOffset() * 60 * 1000;
    const currentZoneDate = new Date(now + offsetMilliSecond + zoneOffset * 60 * 60 * 1000);

    const year = currentZoneDate.getFullYear();
    let month = currentZoneDate.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    const date = currentZoneDate.getDate() < 10 ? '0' + currentZoneDate.getDate() : currentZoneDate.getDate();

    return { year, month, date};
};