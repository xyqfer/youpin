'use strict';

const Promise = require('bluebird');
const cheerio = require('cheerio');
const getData = require('./getData');
const { db, http, params, } = require('app-libs');

module.exports = async () => {
  const dbName = 'NHKEasyNews';

  try {
    const filterKey = 'url';
    let [dbData, newsData] = await Promise.all([
      db.getDbData({
        dbName,
        select: [filterKey]
      }),
      getData(),
    ]);
    
    let newData = newsData.filter(({ url }) => {
        return !dbData.includes(url);
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
            const htmlString = await http.get({
                uri: item.url,
                headers: {
                    'User-Agent': params.ua.pc
                },
            });
            const $ = cheerio.load(htmlString);
            item.content = $('#js-article-body').html();

            return item;
        });

        db.saveDbData({
            dbName,
            data: newData,
        });
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