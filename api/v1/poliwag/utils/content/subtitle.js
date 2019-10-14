'use strict';

module.exports = (url) => {
    require('isomorphic-fetch');
    const Dropbox = require('dropbox').Dropbox;
    const parser = require('subtitles-parser');

    const dropbox = new Dropbox({
        accessToken: process.env.dropboxToken,
    });

    return dropbox
        .filesDownload({
            path: `/Subtitles/${url}.srt`,
        })
        .then((data) => {
            const srt = Buffer.from(data.fileBinary, 'binary').toString();
            const srtData = parser.fromSrt(srt);

            const content = srtData.map((item) => {
                const arr = item.text.split('\n').reverse();

                return {
                    en: arr[0],
                    zh: arr[1] || '',
                };
            });

            return { content };
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject();
        });
};
