'use strict';

module.exports = (data) => {
    const assetReg = /^https:\/\/assets\.materialup\.com/g;
    const cdnHost = 'https://uplabscompress-1252013833.image.myqcloud.com';

    let card = {
        backgroundColor: data.background_color,
        id: data.id,
        animated: data.animated,
        name: data.name,
        detail: data.description_without_html,
        category: data.subcategory_friendly_name_plural
    };

    data.animated_teaser_url = data.animated_teaser_url.replace(assetReg, cdnHost) + '?imageView2/q/75';
    card.cover = data.animated_teaser_url;

    data.preview_url = data.preview_url.replace(assetReg, cdnHost);
    card.urls = [data.preview_url];

    if (data.serialized_makers) {
        const marker = data.serialized_makers[0];
        const markerAvatar = marker.avatar_url;

        if (markerAvatar.indexOf('assets.materialup.com') > -1) {
            card.avatar = markerAvatar.replace(/s3\.amazonaws\.com\//g, '').replace(/^https:\/\/assets\.materialup\.com/g, cdnHost) + '?imageView2/q/75';
            card.verified = marker.verified;
        }

        if (data.maker_name == null || data.maker_name == '') {
            data.maker_name = marker.full_name;
        }
    }

    card.makerName = data.maker_name;
    card.desc = `by ${data.maker_name} in ${data.subcategory_friendly_name_plural}`;

    if (data.images.length > 0) {
        data.images.forEach((img) => {
            let url = img.urls.full.replace(assetReg, cdnHost);
            card.urls.push(url);
        });
    }

    return card;
};