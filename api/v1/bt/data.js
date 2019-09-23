const WebTorrent = require('webtorrent');
let map = {};

module.exports = {
    getBt(id, cb) {
        if (map[id]) {
            return cb(map[id]);
        } else {
            const client = new WebTorrent();
            const onResponse = (torrent) => {
                if (torrent.files.length > 0) {
                    const file = torrent.files[0];
                    cb(file);
                    map[id] = file;
                }
            };

            client.add(id, onResponse);
        }
    },
};