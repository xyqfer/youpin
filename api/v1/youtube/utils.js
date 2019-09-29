const ytdl = require('ytdl-core');

const getUrl = async (id) => {
    let url = '';
    let YOUTUBE_MAP = JSON.parse(process.env.YOUTUBE_MAP);

    if (YOUTUBE_MAP[id] && (YOUTUBE_MAP[id].expire - Date.now() > 0)) {
        url = YOUTUBE_MAP[id].url;
    } else {
        const { formats } = await ytdl.getInfo(id);
        url = formats.filter((item) => {
            return item.container === "mp4";
        })[0].url;
        const expire = (new URL(url)).searchParams.get('expire') * 1000;

        YOUTUBE_MAP[id] = {
            url,
            expire,
        };
        process.env.YOUTUBE_MAP = JSON.stringify(YOUTUBE_MAP);
    }

    return url;
};

module.exports = {
    getUrl,
};