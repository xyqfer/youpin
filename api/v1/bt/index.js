'use strict';

const WebTorrent = require('webtorrent')

module.exports = async (req, res) => {
    const client = new WebTorrent();
    const torrentId = process.env.torrentId;
    const onResponse = (torrent) => {
        if (torrent.files.length > 0) {
            torrent.files[0].createReadStream().pipe(res);
        }
    };

    client.add(torrentId, onResponse);
};