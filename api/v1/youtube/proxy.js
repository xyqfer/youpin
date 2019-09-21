'use strict';

const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const { id } = req.params;

  res.set('Content-Type', 'video/mp4');
  ytdl(`http://www.youtube.com/watch?v=${id}`)
    .pipe(res);
};