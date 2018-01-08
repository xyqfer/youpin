'use strict';

module.exports = ({offset = 0, page = 0}) => {
    const rp = require('request-promise');

    const assetReg = /^https:\/\/assets\.materialup\.com/g;
    const cdnHost = 'https://uplabscompress-1252013833.image.myqcloud.com';

    let url = `https://www.uplabs.com/showcases/all/more.json?days_ago=${offset}&per_page=12&page=${page}`;

    if (page == 0) {
        url = `https://www.uplabs.com/all.json?days_ago=${offset}&page=1`;
    }

    return rp.get({
        timeout: 5000,
        json: true,
        uri: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60'
        }
    }).then((data) => {
        return data.map((item) => {
            let card = {
                backgroundColor: item.background_color,
                id: item.id,
                animated: item.animated,
                name: item.name,
            };

            item.animated_teaser_url = item.animated_teaser_url.replace(assetReg, cdnHost) + '?imageView2/q/75';
            card.cover = item.animated_teaser_url;

            item.preview_url = item.preview_url.replace(assetReg, cdnHost);
            card.urls = [item.preview_url];

            if (item.serialized_makers) {
                const marker = item.serialized_makers[0];
                const markerAvatar = marker.avatar_url;

                if (markerAvatar.indexOf('assets.materialup.com') > -1) {
                    card.avatar = markerAvatar.replace(/s3\.amazonaws\.com\//g, '').replace(/^https:\/\/assets\.materialup\.com/g, cdnHost) + '?imageView2/q/75';
                    card.verified = markerAvatar.verified;
                }

                if (item.maker_name == null || item.maker_name == '') {
                    item.maker_name = marker.full_name;
                }
            }

            card.desc = `by ${item.maker_name} in ${item.subcategory_friendly_name_plural}`;

            if (item.images.length > 0) {
                item.images.forEach((img) => {
                    let url = img.urls.full.replace(assetReg, cdnHost);

                    card.urls.push(url);
                });
            }

            return card;
        });
    });
};