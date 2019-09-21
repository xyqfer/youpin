'use strict';

const ytdl = require('ytdl-core');
const request = require('request');
const { getDbData, saveDbData } = require('app-libs/db');

const getUrl = async (id) => {
    const dbName = 'Youtube';
    let url = '';

    if (process.env.YOUTUBE_MAP[id]) {
        url = process.env.YOUTUBE_MAP[id];
    } else {
        const dbItem = await getDbData({
            dbName,
            limit: 1,
            query: {
              equalTo: ['id', id]
            }
        });

        if (dbItem.length === 0) {
            const { formats } = await ytdl.getInfo(id);
            url = formats.filter((item) => {
                return item.container === "mp4";
            })[0].url;
    
            await saveDbData({
                dbName,
                data: [{
                    id,
                    url,
                }],
            });
        } else {
            url = dbItem[0].url;
        }

        process.env.YOUTUBE_MAP[id] = url;
    }

    return url;
};

module.exports = async (req, res) => {
    const { id } = req.params;
    const url = await getUrl(id);
    const headers = {};

    if (req.headers.range) {
        headers.Range = req.headers.range;
        console.log(req.headers.range);
    }

    request.get({
        url,
        headers,
    }).pipe(res);
};