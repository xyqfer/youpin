'use strict';

const fs = require('fs');

const mapFiles = fs.readdirSync(__dirname).filter((file) => {
  return file.endsWith('.js') && file !== 'index.js';
}).reduce((mapFiles, file) => {
  mapFiles[file.replace('.js', '')] = require(`./${file}`);
  return mapFiles;
}, {});

module.exports = mapFiles;
