'use strict';

module.exports = (req, res) => {
    const http = require('./utils/http');
    const { params } = require('app-libs');
    const { page = 1, text = '' } = req.query;

    http.post({
        json: true,
        uri: 'https://xgemcn70bo-dsn.algolia.net/1/indexes/stickers/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.30.0&x-algolia-application-id=XGEMCN70BO&x-algolia-api-key=19b4a7255a132835763a95eae757a5eb',
        headers: {
            'User-Agent': params.ua.pc,
        },
        body: {
            params: `query=${encodeURIComponent(text)}&page=${page}&filters=lang%3ANA%20OR%20lang%3AEN`,
        },
    })
        .then(({ nbHits, nbPages, hits }) => {
            const data = {
                last: nbPages,
                total: nbHits,
                stickers: hits.map(({ name_en, objectID, link, count, installs }) => ({
                    name: name_en,
                    uuid: objectID,
                    link,
                    count,
                    installs,
                    cover: `https://s.tcdn.co/${objectID.slice(0, 3)}/${objectID.slice(3, 6)}/${objectID}/thumb256.png`,
                })),
            };

            res.json({
                success: true,
                data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: `sticker query ${text} ${page} 获取失败`,
            });
        });
};
