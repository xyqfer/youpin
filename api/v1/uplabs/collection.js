'use strict';

module.exports = (req, res) => {
    const rp = require('request-promise');
    const page = req.query.page || 1;
    const assetReg = /^https:\/\/assets\.materialup\.com/g;
    const cdnHost = 'https://uplabscompress-1252013833.image.myqcloud.com';

    rp.get({
        json: true,
        uri: `https://www.uplabs.com/collections.json?page=${page}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60',
        },
    })
        .then((result) => {
            const collection = result.map((item) => {
                const card = {
                    id: item.id,
                    name: item.name,
                    postCount: item.post_ids.length,
                    linkPath: `${item.link_path}.json`,
                    authorName: item.user.link_path.slice(1),
                };

                card.popularPost = item.popular_posts.map((item) => ({
                    backgroundColor: item.background_color,
                    previewImg: item.vignette_url.replace(assetReg, cdnHost) + '?imageView2/q/75',
                }));

                const avatar = item.user.avatar_url;
                if (avatar && avatar.indexOf('assets.materialup.com') > -1) {
                    card.avatar = avatar.replace(/s3\.amazonaws\.com\//g, '').replace(/^https:\/\/assets\.materialup\.com/g, cdnHost) + '?imageView2/q/75';
                }

                return card;
            });

            res.json(collection);
        })
        .catch(() => {
            res.json([]);
        });
};
