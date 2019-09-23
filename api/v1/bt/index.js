'use strict';

const WebTorrent = require('webtorrent')

module.exports = async (req, res) => {
    const client = new WebTorrent();
    const torrentId = process.env.torrentId;

    client.add(torrentId, function (torrent) {
        torrent.files[0].createReadStream().pipe(res);
    });
};