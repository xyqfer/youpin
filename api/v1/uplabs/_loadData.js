'use strict';

module.exports = ({url, platform}) => {
    const rp = require('request-promise');

    const supportWebp = platform.toLowerCase() == 'android';
    const assetReg = /^https:\/\/assets\.materialup\.com/g;
    const cdnHost = 'https://uplabscompress-1252013833.image.myqcloud.com';

    return rp.get({
        json: true,
        uri: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
        }
    }).then((data) => {
        data = data.map((item) => {
            item.animated_teaser_url = item.animated_teaser_url.replace(assetReg, cdnHost) + '?imageView2/q/75';

            if (!item.animated && supportWebp) {
                item.animated_teaser_url += '/format/webp';
            }

            item.preview_url = item.preview_url.replace(assetReg, cdnHost);

            if (!/\.gif$/g.test(item.preview_url) && supportWebp) {
                item.preview_url += '?imageView2/format/webp';
            }

            if (item.images.length > 0) {
                item.images = item.images.map((img) => {
                    img.urls.full = img.urls.full.replace(assetReg, cdnHost);

                    if (!/\.gif$/g.test(img.urls.full) && supportWebp) {
                        img.urls.full += '?imageView2/format/webp';
                    }

                    return img;
                });
            }

            return item;
        });

        return data;
    });
};