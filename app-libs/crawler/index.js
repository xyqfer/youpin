'use strict';

const cheerio = require('cheerio');
const http = require('../http');

module.exports = async (uri = '', httpSetting = {}, cheerioSetting = {}) => {
    const options = {
        uri,
        transform: (body, response) => {
            const $ = cheerio.load(body, cheerioSetting);

            if (httpSetting.resolveWithFullResponse) {
                return {
                    response,
                    $,
                };
            } else {
                return $;
            }
        },
    };

    return await http({
        ...options,
        ...httpSetting,
    });
};