'use strict';

/**
 * bing 翻译
 */

module.exports = (text = '') => {
    const http = require('./http');
    const { params } = require('app-libs');

    return http
        .get({
            json: true,
            uri: `http://xtk.azurewebsites.net/BingDictService.aspx?Word=${encodeURIComponent(text)}&Samples=false`,
            headers: {
                'User-Agent': params.ua.pc,
            },
        })
        .then((resp) => resp)
        .catch((err) => {
            console.log(err);
            return null;
        });
};
