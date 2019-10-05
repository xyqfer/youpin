'use strict';

const ytdl = require('ytdl-core');
const getData = require('./getData');
const { db, } = require('app-libs');

module.exports = async () => {
  const dbName = 'BetterDevVideo';

  try {
    const filterKey = 'link';
    let [dbData, videoData] = await Promise.all([
      db.getDbData({
        dbName,
        select: [filterKey]
      }),
      getData(),
    ]);
    
    let newData = videoData.filter(({ link }) => {
        return !dbData.includes(link);
    });
    newData = await Promise.filter(newData, async (item) => {
      const dbItem = await db.getDbData({
        dbName,
        limit: 1,
        query: {
          equalTo: [filterKey, item[filterKey]]
        },
        select: [filterKey],
      });

      return dbItem.length === 0;
    }, {
      concurrency: 1,
    });

    if (newData.length > 0) {
        newData = await Promise.mapSeries(newData, async (item) => {
            try {
                const info = await ytdl.getInfo(item.link);
                item.id = info.video_id;
                item.title = info.title;
                item.description = info.description;
                item.cover = info.player_response.videoDetails.thumbnail.thumbnails.reduce((acc, item) => {
                    const size = item.width * item.height;
                    if (size > acc.size) {
                        acc = {
                            size,
                            url: item.url,
                        };
                    }
                    
                    return acc;
                }, {
                    size: 0,
                }).url || '';

                return item;
            } catch(err) {
                console.log(err);
                console.error(item.link);
                return null;
            }
        });

        newData = newData.filter((item) => {
            return !!item;
        });

        if (newData.length > 0) {
            db.saveDbData({
                dbName,
                data: newData,
            });
        }
    }

    return {
      success: true
    };
  } catch (err) {
    console.error(err);
    return {
      success: false
    };
  }
};