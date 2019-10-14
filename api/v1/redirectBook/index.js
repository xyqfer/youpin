'use strict';

module.exports = (req, res) => {
    const path = require('path');

    let url = req.query.url;
    const ua = req.get('User-Agent');

    if (/mobile/i.test(ua)) {
        const bookId = path.basename(url);
        url = `http://m.china-pub.com/touch/touchproduct.aspx?id=${bookId}`;
    }

    res.redirect(url);
};
