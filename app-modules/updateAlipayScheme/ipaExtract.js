'use strict';

const plist = require('simple-plist');
const decompress = require('decompress-zip');
const rimraf = require('rimraf');
const glob = require('glob');
const fs = require('fs');

module.exports = function(file, callback) {
    const outputPath = '/tmp/ipaExtract/';
    fs.mkdirSync(outputPath);
    const data = {};

    const unzipper = new decompress(file);
    unzipper.extract({
        path: outputPath,
    });

    unzipper.on('error', cleanUp);
    unzipper.on('extract', function() {
        const path = glob.sync(outputPath + '/Payload/*/')[0];
        data.metadata = plist.readFileSync(path + 'OpenPlatformAdapter.bundle/ACSettings.plist');
        cleanUp();
    });

    function cleanUp(error) {
        rimraf.sync(outputPath);
        return callback(error, data);
    }
};
