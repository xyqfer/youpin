'use strict';

module.exports = ({
    offsets = [],
    latitude = process.env.latitude,
    longitude = process.env.longitude
}) => {
    const Promise = require('bluebird');
    const rp = require('request-promise');
    const flatten = require('lodash/flatten');
    const {
        params
    } = require('app-libs');

    return Promise.mapSeries(offsets, (offset) => {
        return rp.get({
            json: true,
            uri: `https://restapi.ele.me/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=20&extras[]=activities&extras[]=tags&terminal=h5`,
            headers: {
                'User-Agent': params.ua.mobile,
            }
        }).then((data) => {
            return data;
        }).catch((err) => {
            console.error(err);
            return [];
        });
    }).then((results) => {
        return flatten(results);
    }).catch((err) => {
        console.error(err);
        return [];
    });
};