'use strict';

const ytdl = require('ytdl-core');
const request = require('request');

module.exports = async (req, res) => {
    const { id } = req.params;
  
    const { formats } = await ytdl.getInfo(id);
    const { url } = formats.filter((item) => {
        return item.container === "mp4" && item.resolution === '1080p';
    })[0];
    const headers = {};

    if (req.headers.range) {
        headers.Range = req.headers.range;
    }

    request.get({
        url,
        headers,
    }).pipe(res);
};