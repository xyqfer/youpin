'use strict';

const cheerio = require('cheerio');
const http = require('../http');

module.exports = async (uri = '', httpSetting = {}, cheerioSetting = {}) => {
    const options = {
        uri,
        transform: (body) => {
            return cheerio.load(body, cheerioSetting);
        },
    };

    return await http({
        ...options,
        ...httpSetting,
    });
};