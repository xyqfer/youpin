'use strict';

const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const { id } = req.params;

  ytdl(`http://www.youtube.com/watch?v=${id}`, { filter: (format) => format.container === 'mp4' })
    .pipe(res);
};