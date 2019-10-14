'use strict';

module.exports = ({ offset = 0, page = 0, url = '' }) => {
    const rp = require('request-promise');
    const formatData = require('./_formatData');

    let requestUrl;

    if (url !== '') {
        requestUrl = url;
    } else {
        requestUrl = page === 0 ? `https://www.uplabs.com/all.json?days_ago=${offset}&page=1` : `https://www.uplabs.com/showcases/all/more.json?days_ago=${offset}&per_page=12&page=${page}`;
    }

    return rp
        .get({
            timeout: 5000,
            json: true,
            uri: requestUrl,
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60',
            },
        })
        .then((data) => data.map((item) => formatData(item)));
};
