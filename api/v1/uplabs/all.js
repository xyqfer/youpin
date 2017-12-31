'use strict';

module.exports = (req, res, next) => {
    const rp = require('request-promise');
    const offset = parseInt(req.query.offset);
    const assetReg = /^https:\/\/assets\.materialup\.com/g;
    const cdnHost = 'https://uplabscompress-1252013833.file.myqcloud.com';

    rp.get({
        json: true,
        uri: `https://www.uplabs.com/all.json?days_ago=${offset}&page=1`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
        }
    }).then((data) => {
        data = data.map((item) => {
            item.animated_teaser_url = item.animated_teaser_url.replace(assetReg, cdnHost) + '?imageView2/q/75';
            item.preview_url = item.preview_url.replace(assetReg, cdnHost);

            if (item.images.length > 0) {
                item.images = item.images.map((img) => {
                    img.urls.full = img.urls.full.replace(assetReg, cdnHost);
                    return img;
                });
            }

            return item;
        });

        res.json(data);
    });
};