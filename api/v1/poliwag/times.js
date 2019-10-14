'use strict';

module.exports = (req, res) => {
    require('isomorphic-fetch');
    const Dropbox = require('dropbox').Dropbox;
    const cheerio = require('cheerio');

    const dropbox = new Dropbox({
        accessToken: process.env.dropboxToken,
    });

    dropbox
        .filesDownload({
            path: `/TIMES/toc.ncx`,
        })
        .then((data) => {
            const $ = cheerio.load(Buffer.from(data.fileBinary, 'binary').toString(), {
                normalizeWhitespace: true,
                xmlMode: true,
            });

            const articles = [];

            $('navPoint').each(function() {
                const $elem = $(this);

                articles.push({
                    title: $elem.find('text').text(),
                    url: $elem.find('content').attr('src'),
                });
            });

            res.json({
                success: true,
                data: articles,
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: 'times 获取失败',
            });
        });
};
