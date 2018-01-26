'use strict';

module.exports = (req, res, next) => {
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const formatData = require('./_formatData');
    const saveDbData = require('./_saveDbData');

    const params = req.params;
    const id = params[0];

    rp.get({
        timeout: 5000,
        uri: `https://www.uplabs.com/posts/${id}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
        }
    }).then((htmlString) => {
        const $ = cheerio.load(htmlString);

        try {
            const data = JSON.parse($(`[data-react-class='Post']`).attr('data-react-props'));
            const postData = formatData(data.post);

            saveDbData(postData);
            res.json(postData);
        } catch(e) {
            res.sendStatus(500);
        }
    }).catch(() => {
        res.sendStatus(500);
    });
};