'use strict';

const _ = require('lodash');
const getData = require('./getData');
const { db, crawler, } = require('app-libs');

module.exports = async () => {
  const dbName = 'NHKEasyNews';

  try {
    const filterKey = 'easyUrl';
    let [dbData, newsData] = await Promise.all([
      db.getDbData({
        dbName,
        select: [filterKey]
      }),
      getData(),
    ]);
    
    let newData = _.differenceBy(newsData, dbData, filterKey);
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
                const $ = await crawler(item.easyUrl);
                item.content = $('#js-article-body').html();

                return item;
            } catch(err) {
                console.log(err);
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