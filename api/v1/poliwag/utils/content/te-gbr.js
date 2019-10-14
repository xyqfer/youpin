'use strict';

module.exports = (url) => {
    require('isomorphic-fetch');
    const Dropbox = require('dropbox').Dropbox;
    const cheerio = require('cheerio');

    const dropbox = new Dropbox({
        accessToken: process.env.dropboxToken,
    });

    return dropbox
        .filesDownload({
            path: `/TE/${url}/article.xml`,
        })
        .then((data) => {
            const $ = cheerio.load(Buffer.from(data.fileBinary, 'binary').toString(), {
                normalizeWhitespace: true,
                xmlMode: true,
            });

            const content = [];

            $('content > *').each(function() {
                const $elem = $(this);

                const enText = $elem.find('copy[lang=en_GB]').text();
                const zhText = $elem.find('copy[lang=zh_CN]').text();

                if (enText !== '' && zhText !== '') {
                    content.push({
                        en: enText,
                        zh: zhText,
                    });
                }
            });

            return { content };
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject();
        });
};
