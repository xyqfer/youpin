'use strict';

module.exports = (req, res) => {
    require('isomorphic-fetch');
    const Dropbox = require('dropbox').Dropbox;
    const cheerio = require('cheerio');
    const {
        db: { getDbData, saveDbData },
    } = require('app-libs');

    const dbName = 'TE';
    const errorMessage = 'te-gbr 获取失败';

    getDbData({
        dbName,
    })
        .then((articles) => {
            if (articles.length === 0) {
                const dropbox = new Dropbox({
                    accessToken: process.env.dropboxToken,
                });

                dropbox
                    .filesListFolder({
                        path: '/TE',
                    })
                    .then((resp) => {
                        Promise.mapSeries(resp.entries, (item) =>
                            dropbox
                                .filesDownload({
                                    path: `${item.path_display}/article.xml`,
                                })
                                .then((data) => {
                                    const $ = cheerio.load(Buffer.from(data.fileBinary, 'binary').toString(), {
                                        normalizeWhitespace: true,
                                        xmlMode: true,
                                    });

                                    const title = $('title[lang=en_GB]').text();
                                    const summary = $('rubric[lang=en_GB]').text();

                                    return {
                                        articleId: $('article').attr('id'),
                                        title,
                                        summary,
                                    };
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return {};
                                })
                        )
                            .then((articles) => {
                                res.json({
                                    success: true,
                                    data: articles,
                                });

                                saveDbData({
                                    dbName,
                                    data: articles,
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({
                                    success: false,
                                    msg: errorMessage,
                                });
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({
                            success: false,
                            msg: errorMessage,
                        });
                    });
            } else {
                res.json({
                    success: true,
                    data: articles,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: errorMessage,
            });
        });
};
