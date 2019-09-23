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
                    const data = {
                        file,
                        length: file.length,
                    }
                    cb(data);
                    map[id] = data;
                }
            };

            client.add(id, onResponse);
        }
    },
};