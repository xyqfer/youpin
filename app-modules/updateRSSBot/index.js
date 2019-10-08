'use strict';

module.exports = async () => {
  const rp = require('request-promise');
  const flattenDeep = require('lodash/flattenDeep');
  const getRSSData = require('./getRSSData');
  const { getDbData, getDbCount, saveDbData } = require('app-libs/db');

  const dbName = 'RSSDATA';

  try {
    const filterKey = 'link';
    const fetchAllDbData = async () => {
      const offsets = [];
      const per = 1000;

      const dbCount = await getDbCount({
          dbName,
      });
      const maxDbFetchTimes = 10;
      const limit = Math.min(Math.ceil(dbCount / per), maxDbFetchTimes);

      for (let offset = 0; offset < limit; offset += 1) {
          offsets.push(offset * per);
      }

      let dbData = await Promise.mapSeries(offsets, async (offset) => {
          const dbData = await getDbData({
              dbName,
              query: {
                  descending: ['updatedAt'],
                  skip: [offset],
                  select: [filterKey],
              },
          });

          return dbData;
      });
      return flattenDeep(dbData);
    };


    let [dbData, rssData] = await Promise.all([
      fetchAllDbData(),
      getRSSData(),
    ]);
    dbData = dbData.map(({ link }) => {
      return link;
    });

    let newData = rssData.filter(({ link }) => {
      return !dbData.includes(link);
    });
    newData = await Promise.filter(newData, async (item) => {
      const dbItem = await getDbData({
        dbName,
        limit: 1,
        query: {
          equalTo: [filterKey, item[filterKey]]
        }
      });

      return dbItem.length === 0;
    }, {
      concurrency: 1
    });

    if (newData.length > 0) {
      saveDbData({
        dbName,
        data: newData,
      });

      const message = newData.reduce((acc, { title, link }, index) => {
        const isLast = index === newData.length - 1;
        const url = new URL(link);
        if (url.hostname === 'www.zhihu.com') {
          link = `${process.env.CF_WORKER_URL}${url.pathname}`;
        }
        acc += `${title.trim()} ${link}${isLast ? '' : '\n\n'}`;
        return acc;
      }, 'RSSBOT 有更新:\n\n');
      rp.post({
        uri: process.env.qqboturl,
        json: true,
        body: {
          'group_id': parseInt(process.env.qqbotgroupid),
          'message': message,
        },
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